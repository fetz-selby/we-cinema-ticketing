import express from 'express';
import * as utils from '../resources/utils';
import * as appConfig from '../config';
import dateformat from 'dateformat';
import pdf from 'html-pdf';
// import jwt from 'jsonwebtoken';

    
export default class BookRoutes{

    constructor(CustomerModel, PurchaseModel, SeatModel, SecureModel, AuditoriumModel, MovieModel){
        this.CustomerModel = CustomerModel;
        this.SeatModel = SeatModel;
        this.PurchaseModel = PurchaseModel;
        this.SecureModel = SecureModel;
        this.AuditoriumModel = AuditoriumModel;
        this.MovieModel = MovieModel;
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

                if(!(card && card.trim().length > 15 && utils.isNumbers(card))){
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
        const fullname = req.body.fullname.toUpperCase();
        const card_number = req.body.card;
        const code = req.body.code;
        const expire_month = req.body.expire_month;
        const expire_year = req.body.expire_year;
        const gen_code = req.body.gen_code;


        //Attach customer_id to seat and update seat

        //use transaction to persist
        const seatInfo = [];
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
                        
                        let seat = await app.SeatModel.findOne({where: {id: seat_id}, transaction: t}); 
                        let auditorium = await app.AuditoriumModel.findOne({where : {id: seat.auditorium_id, status: 'A'}, transaction: t});
                        let movie = await app.MovieModel.findOne({where : {id: auditorium.movie_id, status: 'A'}, transaction: t})



                        seatInfo.push({movie: movie.name, 
                                        auditorium: auditorium.auditorium_name, 
                                        row: seat.row, 
                                        column: seat.column,
                                        price: auditorium.price,
                                        time: auditorium.time
                                        });
                    }else{
                        throw 'seat is booked';
                    }
                }else{
                    throw 'seat has expired/booked'
                }
            }

            //Generate and send PDF
            const dySeats = utils.getHTMLSeats(seatInfo);

            const maskedCard = card_number.substring(13);
            const expiryDate = expire_month+'/'+expire_year;
            const desc = seatInfo[0].movie.toUpperCase()+', '+seatInfo[0].price+' EUR, '+seatInfo[0].auditorium;
            const price = seatInfo[0].price;
            const numberSeats = seats.length;
            const totalPrice = cost;
            const transactionId = customer.id;
            const date = dateformat(new Date(), 'dd/mm/yyyy');
            const movie = seatInfo[0].movie;
            const time = seatInfo[0].time;
            const auditorium = seatInfo[0].auditorium;



            const html = utils.getHTMLPaymentReciept(fullname,
                                        maskedCard,
                                        expiryDate,
                                        desc,
                                        price,
                                        numberSeats,
                                        totalPrice,
                                        gen_code,
                                        transactionId,
                                        date,
                                        movie,
                                        time,
                                        auditorium,
                                        dySeats
                                        )



            pdf.create(html).toFile(function(err, f){
                if(f.filename){
                    res.status(200).sendFile(f.filename);  
                }else{
                    res.status(200).sendFile(f);  
                }                              
            })
            // res.status(200)
            // .json({
            //     success: true,
            //     message: 'seat(s) booked successfully'
            // })
            
        }).catch((err)=>{
            res.status(400)
            .json({
                success: false,
                message: 'seat(s) could not be booked successfully'
            })
        })
    }

}