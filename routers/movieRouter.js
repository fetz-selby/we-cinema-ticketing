import express from 'express';
import request from 'request';
    
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
                //Check for id type
                app.oneMovieRequest(res, req.params.id);
            }); 

        movieRouter.route('/')
            .post((req, res)=>{
                res.status(200)
                .json({
                    success: false,
                    message: 'no implementation'
                })
            }); 
            

        movieRouter.route('/:id')
            .delete((req, res)=>{
                const id = req.params.id;
                app.MovieModel.findOne({where : {id, status: 'A'}})
                .then((movie)=>{
                    if(movie){
                        movie.update({status: 'D'})
                        .then(()=>{
                            res.status(200)
                            .json({
                                success: true,
                                message: 'movie deleted successfully'
                            })
                        })
                    }else{
                        res.status(400)
                        .json({
                            success: false,
                            message: 'movie does not exist'
                        })
                    }
                })
            });

        return movieRouter;
    }

    async allMoviesRequest(res){
        const app = this;
        
        //Grab all movies
        let allMovies = await app.MovieModel.findAll({where : {status : 'A'}});
        if(allMovies){
            let result = [];
            allMovies.map(async (movie, i)=>{
                const movie_name = movie.name;
                const movie_id = movie.id;

                let auditoriums = await app.AuditoriumModel.findAll({where : {movie_id: movie_id, status : 'A'}});
                
                //Do not show auditorium without movie schedule
                if(auditoriums.length > 0){
                    result.push( {
                        movie_id,
                        movie_name,
                        auditoriums
                    })
                }

                if(i === allMovies.length - 1){
                    res.status(200).json({
                        success : true,
                        message : 'movie request successful',
                        result
                    })
                }
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
            const movie_name = movie.name;
            const movie_id = movie.id;

            let auditoriums = await app.AuditoriumModel.findAll({where : {movie_id: movie_id, status : 'A'}});

            res.status(200).json({
                success : true,
                message : 'all movies request successful',
                result : {movie_id, movie_name, auditoriums}
            })
        }else{
            res.status(400).json({
                success: false,
                message: 'no movie available'
            })
        }
    }
};