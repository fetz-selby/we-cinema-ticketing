import express from 'express';
import _ from 'lodash';
    
export default class MovieRoutes{

    constructor(AuditoriumModel, MovieModel, SeatModel){
        this.AuditoriumModel = AuditoriumModel;
        this.MovieModel = MovieModel;
        this.SeatModel = SeatModel;
    }

    routes(){
        const app = this;
        const movieRouter = express.Router();

        movieRouter.route('/')
            .get((req, res)=>{  
                app.allMoviesRequest(res);
            });   

        movieRouter.route('/:id')
            .get((req, res)=>{
                app.oneMovieRequest(res, req.params.id);
            }); 

        // movieRouter.route('/:id')
        //     .delete((req, res)=>{
        //         const id = req.params.id;
        //         app.MovieModel.findOne({where : {id, status: 'A'}})
        //         .then((movie)=>{
        //             if(movie){
        //                 movie.update({status: 'D'})
        //                 .then(()=>{
        //                     res.status(200)
        //                     .json({
        //                         success: true,
        //                         message: 'movie deleted successfully'
        //                     })
        //                 })
        //             }else{
        //                 res.status(400)
        //                 .json({
        //                     success: false,
        //                     message: 'movie does not exist'
        //                 })
        //             }
        //         })
        //     });

        return movieRouter;
    }

    async allMoviesRequest(res){
        const app = this;
        
        //Grab all movies
        let allMovies = await app.MovieModel.findAll({where : {status : 'A'}});
        if(allMovies){
            let result = [];

            for(const movie of allMovies){
                const movie_name = movie.name;
                const movie_id = movie.id;
                const days = [];

                let auditoria = await app.AuditoriumModel.findAll({where : {movie_id: movie_id, status : 'A'}, attributes: ['id', 'auditorium_name', 'day', 'time', 'x_size', 'y_size', 'price']});
                
                //Grab all days
                const unUniqDays = [];
                for(const auditorium of auditoria){
                    unUniqDays.push(auditorium.day);
                }

                //Grab all unique days and filter
                const uniqueDays = _.uniq(unUniqDays);

                for(const day of uniqueDays){
                   const filtered_auditoria =  _.filter(auditoria, {day});

                   const times = [];
                   for(const auditorium of filtered_auditoria){
                       times.push({auditorium_id : auditorium.id,
                                    auditorium_name : auditorium.auditorium_name,
                                    time: auditorium.time,
                                    x_size: auditorium.x_size,
                                    y_size: auditorium.y_size,
                                    price: auditorium.price })
                   }

                   days.push({day, times});
                }

                result.push({movie_id, movie_name, days});
            }

            res.status(200).json({
                success : true,
                message : 'movie request successful',
                result
            })
        }else{
            res.status(400).json({
                success: false,
                message: 'no movies available'
            })
        }
    }

    async oneMovieRequest(res, movie_id){
        const app = this;
        
        //Grab movie
        let movie = await app.MovieModel.findOne({where : {id : movie_id, status : 'A'}});
        if(movie){
            let result = [];

            const movie_name = movie.name;
            const movie_id = movie.id;
            const days = [];

            let auditoria = await app.AuditoriumModel.findAll({where : {movie_id: movie_id, status : 'A'}, attributes: ['id', 'auditorium_name', 'day', 'time', 'x_size', 'y_size', 'price']});
            
            //Grab all days
            const unUniqDays = [];
            for(const auditorium of auditoria){
                unUniqDays.push(auditorium.day);
            }

            //Grab all unique days and filter
            const uniqueDays = _.uniq(unUniqDays);

            for(const day of uniqueDays){
                const filtered_auditoria =  _.filter(auditoria, {day});

                const times = [];
                for(const auditorium of filtered_auditoria){
                    times.push({auditorium_id : auditorium.id,
                                auditorium_name : auditorium.auditorium_name,
                                time: auditorium.time,
                                x_size: auditorium.x_size,
                                y_size: auditorium.y_size,
                                price: auditorium.price })
                }

                days.push({day, times});
            }

            result.push({movie_id, movie_name, days});

            res.status(200).json({
                success : true,
                message : 'movie request successful',
                result
            })
        }else{
            res.status(400).json({
                success: false,
                message: 'no movies available'
            })
        }
    }
};