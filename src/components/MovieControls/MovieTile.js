import React from 'react';
import MovieTitle from './MovieTitle';
import MovieScheduler from './MovieSchedule';
import '../../styles/movie.css';

const MovieTile = (props) =>{
    return (
    <div className='movie-tile-container'>
        <MovieTitle title={props.title}></MovieTitle>
        {props.days.map((day)=>{
           return <MovieScheduler key={day.day} day={day.day} times={day.times} onTimeInvoked={props.onTimeInvoked}></MovieScheduler>
        })}
    </div>
    );
}

export default MovieTile;