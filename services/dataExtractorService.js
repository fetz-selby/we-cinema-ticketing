import * as appConfig from '../config';
import fs from 'fs';
import path from 'path';

export default class DataExtractor{

    constructor(auditoriumDir, performaceFile, AuditoriumModel, MovieModel, SeatModel){
        this.auditoriumDir = auditoriumDir;
        this.performaceFile = performaceFile;
        this.AuditoriumModel = AuditoriumModel;
        this.MovieModel = MovieModel;
        this.SeatModel = SeatModel;
    }

    initDB(){
        this.readPerformanceFile();
    }


    async readAuditoriumDir(){
        const app = this;

        fs.readdir(app.auditoriumDir, async (err, files) => {
            for(const filename of files){

                //Read Individual file
                fs.readFile(path.join(app.auditoriumDir, filename), 'utf8', async (err, data)=>{
                   
                    //Find dimensions
                    const auditoriaPlan = data.split('\n');

                    let y_size = 0;
                    let x_size = 0;
                    let auditorium_name = filename.split('.')[0].toUpperCase();

                    //Check for whitespaces
                    for(const plan of auditoriaPlan){
                        const tmpPlan = plan.trim();
                        if(tmpPlan.length>0){
                            y_size ++;

                            if(tmpPlan.length > x_size){
                                x_size = tmpPlan.length;
                            }
                        }
                    }

                    //Update auditorium
                   let auditoria = await app.AuditoriumModel.findAll({where : {auditorium_name, status: 'A'}});

                   if(auditoria){
                       for(const auditorium of auditoria){
                            const auditorium_id = auditorium.id;

                            //Update auditorium with size
                            await auditorium.update({x_size,y_size});

                            //Set row and columns for seats
                            let row = 0;
                            for(const plan of auditoriaPlan){
                                row ++;
                                const planSize = plan.trim().length;
                                const difference = x_size - planSize;
                                if(difference === 0){
                                    //Create seats of size x_size on row
                                    for(let i=1; i <= x_size; i++){
                                        await app.SeatModel.create({row, column: i, auditorium_id});
                                    }
                                }else if(difference === 1){
                                    for(let i=2; i <= x_size; i++){
                                        await app.SeatModel.create({row, column: i, auditorium_id});
                                    }
                                }else if(difference % 2 === 0){
                                    const startColumn = difference/2;
                                    for(let i=startColumn+1; i <= x_size-startColumn; i++){
                                        await app.SeatModel.create({row, column: i, auditorium_id});
                                    }
                                }else if(difference % 2 !== 0){
                                    const startColumn = parseInt(difference/2);
                                    for(let i=startColumn+2; i <= x_size-startColumn; i++){
                                        await app.SeatModel.create({row, column: i, auditorium_id});
                                    }
                                }
                            }
                       }
                   }
                })
            }    
        })
    }

    async readPerformanceFile(){
        const app = this;

        fs.readFile(app.performaceFile, 'utf8', async(err, data)=>{
            if(err){
                console.log('Read file error');
            }

            //Group into movies
            //const re = /^([\D][\s]*)*[;]$/g;

            const groupMovies = data.split('\n');

            //Save movies
            if(groupMovies){
                for (const movie of groupMovies){
                    const title = movie.split(';')[0].trim();

                    //Saving in order from file
                    let savedMovie = await app.MovieModel.create({name: title});

                    if(savedMovie){
                        //Saving plan
                        const movie_id = savedMovie.id;
                        const plan = movie.split(';')[1].trim();
                        
                        //Split plan as CSV
                        const plans = plan.split(',');

                        for(const show of plans){

                            const day = show.split('/')[0].trim();
                            const time = show.split('/')[1].trim();
                            const auditorium_name = show.split('/')[2].trim();
                            const price = show.split('/')[3].trim();

                            await app.AuditoriumModel.create({
                                auditorium_name,
                                movie_id,
                                day,
                                time,
                                price,
                            })
                        }
                    }
                    
                }

                app.readAuditoriumDir();
            }

        });
    }

}