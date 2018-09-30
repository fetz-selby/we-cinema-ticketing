import express from 'express';
import * as appConfig from '../config';
import jwt from 'jsonwebtoken';

export default class SeatScheduler{

    constructor(minutes, SeatModel, SecureModel){
        this.minutes = minutes;
        this.SeatModel = SeatModel;
        this.SecureModel = SecureModel;
    }


    startScheduler(){
        const app = this;
        setInterval(()=>{
            console.log('Scheduler Started');
            app.SecureModel.findAll({where : {status: 'A'}})
            .then((secures)=>{
                if(secures){
                    secures.map((secure)=>{
                        const token = secure.token;
                        const seat_id = secure.seat_id;

                        if(!app.isValidToken(token)){
                            secure.update({status: 'D'});
                            app.SeatModel.update({status: 'A'}, {where :{id: seat_id}})
                            console.log('seat made available => '+seat_id);
                        }
                    })
                }
            })
        }, parseFloat(app.minutes)*60*1000);
    }

    isValidToken(token){
        const expressApp = express();
        expressApp.set('token', appConfig.config.secret);


        jwt.verify(token, expressApp.get('token'), function(err, decoded) {      
            if (err) {
                return false;
            } else {
                return true;
            }
        });
    }

}