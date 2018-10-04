import express from 'express';
    
export default class AuditoriumRoutes{

    constructor(AuditoriumModel, SeatModel, MovieModel){
        this.AuditoriumModel = AuditoriumModel;
        this.SeatModel = SeatModel;
        this.MovieModel = MovieModel;
    }

    routes(){
        const app = this;
        const auditoriumRouter = express.Router();

        auditoriumRouter.route('/')
            .get((req, res)=>{  
                app.allAuditoriumRequest(res)
            });   

        auditoriumRouter.route('/:id')
            .get((req, res)=>{
                app.auditoriumRequest(res, req.params.id);
            }); 

        return auditoriumRouter;
    }

    async allAuditoriumRequest(res){
        //Grab all auditoria
        const app = this;

        let auditoria = await app.AuditoriumModel.findAll({where : {status : 'A'},
                                                            include: [{model: app.MovieModel}]
                                                        });
        if(auditoria){
            let result = [];
            auditoria.map(async (auditorium, i)=>{
                const auditorium_id = auditorium.id;
                const auditorium_name = auditorium.auditorium_name;
                const movie_id = auditorium.movie_id;
                const day = auditorium.day;
                const time = auditorium.time;
                const size = {x_size: auditorium.x_size, y_size: auditorium.y_size};
                const movie_name = auditorium.movie.name;
                const price = auditorium.price;

                let seats = await app.SeatModel.findAll({where : {auditorium_id}, attributes: ['id', 'row', 'column', 'status']});
                
                //Do not show auditorium without movie schedule
                if(seats){
                    result.push( {
                        auditorium_id,
                        auditorium_name,
                        movie_id,
                        movie_name,
                        day,
                        time,
                        size,
                        price,
                        seats
                    })
                }

                if(i === auditoria.length - 1){
                    res.status(200).json({
                        success : true,
                        message : 'auditoria request successful',
                        result
                    })
                }
            })
        }else{
            res.status(400).json({
                success: false,
                message: 'no auditoria available'
            })
        }
    }

    async auditoriumRequest(res, id){
        //Grab all auditoria
        const app = this;

        let auditorium = await app.AuditoriumModel.findOne({where : {id: id, status : 'A'},
                                                            include: [{model: app.MovieModel}]
                                                        });
        if(auditorium){
            let result = [];
            const auditorium_id = auditorium.id;
            const auditorium_name = auditorium.auditorium_name;
            const movie_id = auditorium.movie_id;
            const day = auditorium.day;
            const time = auditorium.time;
            const size = {x_size: auditorium.x_size, y_size: auditorium.y_size};
            const movie_name = auditorium.movie.name;
            const price = auditorium.price;

            let seats = await app.SeatModel.findAll({where : {auditorium_id}, attributes: ['id', 'row', 'column', 'status']});
            
            //Do not show auditorium without movie schedule
            if(seats){
                result.push( {
                    auditorium_id,
                    auditorium_name,
                    movie_id,
                    movie_name,
                    day,
                    time,
                    size,
                    price,
                    seats
                })
            }

            res.status(200).json({
                success : true,
                message : 'auditorium request successful',
                result
            })
            
            
        }else{
            res.status(400).json({
                success: false,
                message: 'no auditorium available'
            })
        }
    }

};