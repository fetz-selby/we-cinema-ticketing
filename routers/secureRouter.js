import express from 'express';
import * as appConfig from '../config';
import dateformat from 'dateformat';
import * as utils from '../resources/utils';
import jwt from 'jsonwebtoken';

    
export default class SecureRoutes{

    constructor(SeatModel, SecureModel, AuditoriumModel){
        this.SeatModel = SeatModel;
        this.SecureModel = SecureModel;
        this.AuditoriumModel = AuditoriumModel;
    }

    routes(){
        const app = this;
        const secureRouter = express.Router();

        secureRouter.route('/')
            .get((req, res)=>{  
            });   

        secureRouter.route('/:id')
            .get((req, res)=>{
            }); 

        secureRouter.route('/movie/:id')
            .get((req, res)=>{
              
            });

        secureRouter.route('/')
            .post((req, res)=>{
                const seats = req.body.seats;
                if(seats && Array.isArray(seats)){
                    app.secureSeats(res, seats);
                }else{
                    res.status(400)
                    .json({
                        success: false,
                        message: 'no seats provided'
                    })
                }
            }); 
            
        secureRouter.route('/:id')
            .delete((req, res)=>{
                
            });

        return secureRouter;
    }

    async secureSeats(res, data){
        const app = this;
        let cost = 0; 

        //Check if they're valid seats and get cost
        try{
            for(const id of data){
                let seat = await app.SeatModel.findOne({where: {id, status: 'A'}});

                if(!seat){
                    throw 'seat id invalid'
                }

                let seatCost = await app.AuditoriumModel.findOne({where: {id: seat.auditorium_id, status: 'A'}});
                if(seatCost){
                    cost += seatCost.price;
                }else{
                    throw 'seat cost not found'
                }
            }
        }catch(err){
            res.status(400)
            .json({
                success: false,
                message: 'invalid seat id'
            })

            return;
        }
        console.log('Got here');

        //Start a transaction to secure the seats
        //Change seat status to 'P'

        let code = utils.generateCode();

        await appConfig.sequelize.transaction( async t=>{

            for(const id of data){
                let update = await app.SeatModel.update({status : 'P'}, {where : {id, status: 'A'}, transaction: t})
                     
                //Generate code and grab token
                if(update > 0){
                    await app.SecureModel.create({seat_id: id,
                                                  gen_code: code,
                                                  token: app.getToken() }, {transaction: t})
                }else{
                    throw 'seat is booked';
                }
            }

            const expiryDate = dateformat(utils.getExpiry(1), 'ddd, mmm dS, yyyy, HH:MM:ss');
            const purchaseDate = dateformat(new Date(), 'ddd, mmm dS, yyyy, HH:MM:ss');

            res.status(200)
            .json({
                success: true,
                message: 'seat(s) reserved successfully',
                result: {
                    code,
                    cost: cost,
                    purchase_date: purchaseDate,
                    expire_date: expiryDate
                }
            })
            
        }).catch((err)=>{
            res.status(400)
            .json({
                success: false,
                message: 'seat(s) could not be reserved successfully'
            })
        })
    }

    getToken(){
        const expressApp = express();
        expressApp.set('token', appConfig.config.secret);

       return jwt.sign({data: appConfig.config.secret}, expressApp.get('token'), {expiresIn: (appConfig.config.seat_secure_timer*60)});
    }
}