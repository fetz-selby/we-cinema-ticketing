import express from 'express';
import * as utils from '../resources/utils';
import * as appConfig from '../config';
import jwt from 'jsonwebtoken';

    
export default class BookRoutes{

    constructor(CustomerModel, PurchaseModel, SeatModel, SecureModel, AuditoriumModel){
        this.CustomerModel = CustomerModel;
        this.SeatModel = SeatModel;
        this.PurchaseModel = PurchaseModel;
        this.SecureModel = SecureModel;
        this.AuditoriumModel = AuditoriumModel;
    }

    routes(){
        const app = this;
        const bookRouter = express.Router();

        bookRouter.route('/')
            .get((req, res)=>{  

            });   

        bookRouter.route('/:id')
            .get((req, res)=>{

            }); 

        bookRouter.route('/movie/:id')
            .get((req, res)=>{
              
            });

        bookRouter.route('/')
            .post((req, res)=>{
                const fullname = req.body.fullname;
                const card = req.body.card;
                const code = req.body.code;
                const expire_month = req.body.expire_month;
                const expire_year = req.body.expire_year;
                const seats = req.body.seat;
                const genCode = req.body.gen_code;

                //Validate request
                if(!(fullname && fullname.trim().length > 5)){
                    res.status(400)
                    .json({
                        success: false,
                        message: 'invalid fullname'
                    })

                    return;
                }

                if(!(card && card.trim().length > 13 && utils.isNumbers(card))){
                    res.status(400)
                    .json({
                        success: false,
                        message: 'invalid card number'
                    })

                    return;
                }

                if(!(code && code.trim().length === 3 && utils.isNumbers(code))){
                    res.status(400)
                    .json({
                        success: false,
                        message: 'invalid code'
                    })

                    return;
                }

                if(!(expire_month && expire_month.trim().length === 2 && utils.isNumbers(expire_month))){
                    res.status(400)
                    .json({
                        success: false,
                        message: 'invalid expire month'
                    })

                    return;
                }

                if(!(expire_year && expire_year.trim().length === 4 && utils.isNumbers(expire_year))){
                    res.status(400)
                    .json({
                        success: false,
                        message: 'invalid expire year'
                    })

                    return;
                }

                if(!(seats && seats.length > 0 && Array.isArray(seats))){
                    res.status(400)
                    .json({
                        success: false,
                        message: 'invalid seat'
                    })

                    return;
                }

                if(!(genCode && genCode.length === 6)){
                    res.status(400)
                    .json({
                        success: false,
                        message: 'invalid gen code. secure seats to obtain gen code'
                    })

                    return;
                }

                app.book(req, res);
            }); 
            

        bookRouter.route('/:id')
            .delete((req, res)=>{
                
            });

        return bookRouter;
    }

    async book(req, res){
        
        const app = this;

        //Check if all seats are pending and get cost
        const seats = req.body.seat;
        let flag = false;

        let cost = 0;
        for(const seat_id of seats){
            let availableSeat = await app.SeatModel.findOne({where : {id: seat_id, status: 'P'}});

            if(!availableSeat){
                flag = true;
                break;
            }
            
            let seatCost = await app.AuditoriumModel.findOne({where: {id: availableSeat.auditorium_id, status: 'A'}});
            if(seatCost){
                cost += seatCost.price;
            }else{
                flag = true;
                break;
            }
            
        }

        if(flag){
            res.status(400)
            .json({
                success: false,
                message: 'invalid seat'
            })

            return;
        }

        //Save details and seat
        const fullname = req.body.fullname;
        const card_number = req.body.card;
        const code = req.body.code;
        const expire_month = req.body.expire_month;
        const expire_year = req.body.expire_year;
        const gen_code = req.body.gen_code;


        //Attach customer_id to seat and update seat

        //use transaction to persist
        await appConfig.sequelize.transaction( async t=>{
            let customer = await app.CustomerModel.create({fullname,card_number, expire_month, expire_year, code, cost}, {transaction: t});

            for(const seat_id of seats){
                let reserved = await app.SecureModel.findOne({where : {gen_code, seat_id, status: 'A'}, transaction: t});
                if(reserved){

                    let update = await app.SeatModel.update({status : 'B'}, {where : {id: seat_id, status: 'P'}, transaction: t});
                     
                    if(update > 0){
                        await app.PurchaseModel.create({customer_transaction_id: customer.id, 
                            seat_id}, {transaction: t});
                        await app.SecureModel.update({status: 'D'}, {where: {seat_id}, transaction: t});
                    }else{
                        throw 'seat is booked';
                    }
                }else{
                    throw 'seat has expired/booked'
                }
            }

            res.status(200)
            .json({
                success: true,
                message: 'seat(s) booked successfully'
            })
            
        }).catch((err)=>{
            res.status(400)
            .json({
                success: false,
                message: 'seat(s) could not be booked successfully'
            })
        })
    }

}