import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';
import session from 'express-session';
import * as appConfig from './config';
import path from 'path';

//Models
import Auditorium from './models/auditoriumModel';
import Seat from './models/seatModel';
import Movie from './models/movieModel';
import Purchase from './models/purchasesModel';
import Customer from './models/customerDetailModel';
import Secure from './models/secureSeatModel';

//Routers
import AuditoriumRouter from './routers/auditoriumRouter';
import MovieRouter from './routers/movieRouter';
import TicketRoutes from './routers/ticketRouter';

//Services
import SeatScheduler from './services/seatScheduler';
import DataExtractor from './services/dataExtractorService';


export default class App {

    constructor(){
        this.app = express();
        this.initExpress(this.app);
        this.initSQLAndRouters(this.app);
        this.finalize(this.app);
    }

    initExpress(app){
        app.use(bodyParser.json({limit: '50mb', parameterLimit: 1000000}));
        app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
        app.use(cookieParser());
        app.use(session({resave:true, saveUninitialized: true, 
                        secret: 'thequickbrownfoxjumpedoverthelazydogs',
                        cookieName: 'session',
                        duration: 30*60*1000, 
                        activeDuration: 5*60*1000, 
                        httpOnly: true, 
                        cookie: {secure: false }}));

        //CORS enabling
        app.use((req, res, next)=>{
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
          res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
          next();
        });

        //logging
        app.use(logger('dev'));

        app.use(express.static('build'));

        //Disable cache
        app.use((req, res, next) => {
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            res.header('Expires', '-1');
            res.header('Pragma', 'no-cache');
            next();
        });

        app.get('/', (req, res)=>{
            res.sendFile(path.join(__dirname, 'build', 'index.html'));
        });

    }

    async initSQLAndRouters(app){

        const db = appConfig.sequelize;

        const auditoriumModel =  new Auditorium().model(db);
        const seatModel = new Seat().model(db);
        const movieModel = new Movie().model(db);
        const purchaseModel = new Purchase().model(db);
        const customerModel = new Customer().model(db);
        const secureModel = new Secure().model(db);

        auditoriumModel.belongsTo(movieModel);
        seatModel.belongsTo(auditoriumModel);
        secureModel.belongsTo(seatModel);

        purchaseModel.belongsTo(seatModel);
        purchaseModel.belongsTo(customerModel);

        auditoriumModel.hasMany(seatModel);
        customerModel.hasMany(purchaseModel);

        //Init Routers
        const auditoriumRouter = new AuditoriumRouter(auditoriumModel, seatModel, movieModel);
        const movieRouter = new MovieRouter(auditoriumModel, movieModel, seatModel);
        const ticketRouter = new TicketRoutes(customerModel, purchaseModel, seatModel, secureModel, auditoriumModel, movieModel);

        await db.sync()

        if(appConfig.config.prepare){     
            //Init DB
            const vorstellungen = path.resolve('./resources/Vorstellungen.txt');
            const auditoria = path.resolve('./resources/auditoria');

            //Run data extractor
            const dataExtractor = new DataExtractor(auditoria, vorstellungen, auditoriumModel, movieModel, seatModel);
            dataExtractor.initDB();
        }

        app.use('/wibas-eterate/ticket/api/v1/movies', movieRouter.routes()); 
        app.use('/wibas-eterate/ticket/api/v1/auditoria', auditoriumRouter.routes()); 
        app.use('/wibas-eterate/ticket/api/v1/tickets', ticketRouter.routes()); 

        //Start Services

        //Run seat-scheduler
        const seatCronScheduler = new SeatScheduler(appConfig.config.cron_timer, seatModel, secureModel);
        seatCronScheduler.startScheduler();
    }

    finalize(app){
        const PORT = appConfig.config.SERVER_PORT;
        app.listen(parseInt(PORT), ()=>{
            console.log('Running on PORT ::: '+PORT);
        });
    }
}

const server = new App();