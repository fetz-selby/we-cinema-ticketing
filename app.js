import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';
import session from 'express-session';

import * as d from './config';

import jwt from 'jsonwebtoken';
import path from 'path';
// import { setTimeout } from 'timers';

//Models
import Auditurium from './models/auditoriumModel';
import Seat from './models/seatModel';
import Movie from './models/movieModel';
import Purchase from './models/purchasesModel';
import Customer from './models/customerDetailModel';

//Routers
import AuditoriumRouter from './routers/auditoriumRouter';
import MovieRouter from './routers/movieRouter';
import BookRouter from './routers/bookRouter';


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
        //app.use(expressValidator([]));
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

    validate(req, res, next){
        const app = express();

        //JSON Web Token Secret
        app.set('token', d.config.secret);

         // check header or url parameters or post parameters for token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const app_id = req.body.app_id || req.query.app_id;
        
        // decode token
        if(token) {
    
            // verifies secret and checks exp
            jwt.verify(token, app.get('token'), function(err, decoded) {      
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });    
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded; 
                    next();

                    //Check if app id is valid

                    //next();
                    //isAppIdValid(app_id,res,next);
                    // const dbConfig = d.sequelize;
                    // const appModel = models.appModel(dbConfig);

                    // appModel.findOne({where : {id : app_id, status : 'A'}})
                    // .then((app)=>{
                    //     if(app){
                    //         next();
                    //     }else{
                    //         console.log('App not registered');
                    //         res.status(400).send('App not registered');
                    //     }
                    // })
                }
            });
    
        }else{
    
            // if there is no token
            // return an error
            return res.status(403).send({ 
                success: false, 
                message: 'No token provided.' 
            });
        }

        //next();
    }

    initSQLAndRouters(app){

        const db = d.sequelize;
        const auditoriumModel =  new Auditurium().model(db);
        const seatModel = new Seat().model(db);
        const movieModel = new Movie().model(db);
        const purchaseModel = new Purchase().model(db);
        const customerModel = new Customer().model(db);

        auditoriumModel.belongsTo(movieModel);
        seatModel.belongsTo(auditoriumModel);

        purchaseModel.belongsTo(seatModel);
        purchaseModel.belongsTo(customerModel);

        auditoriumModel.hasMany(seatModel);
        customerModel.hasMany(purchaseModel);

        //Init Routers
        const auditoriumRouter = new AuditoriumRouter(auditoriumModel, seatModel, movieModel);
        const movieRouter = new MovieRouter(auditoriumModel, movieModel, seatModel);
        const bookRouter = new BookRouter(customerModel, purchaseModel, seatModel);

        //Init DB
        if(d.config.prepare){          
            db.sync()
        }

        //Set Middleware to check for tokens
        //app.use('/wibas-eterate/api/v1/*', this.validate); 
        app.use('/wibas-eterate/ticket/api/v1/movies', movieRouter.routes()); 
        app.use('/wibas-eterate/ticket/api/v1/auditoria', auditoriumRouter.routes()); 
        app.use('/wibas-eterate/ticket/api/v1/purchase_ticket', bookRouter.routes()); 

    }

    finalize(app){
        const PORT = d.config.SERVER_PORT;
        app.listen(parseInt(PORT), ()=>{
            console.log('Running on PORT ::: '+PORT);
        });
    }
}

const server = new App();