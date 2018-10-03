import React from 'react';
import '../../styles/auditorium.css';

const MovieSummary = (props) =>{
    return (
    <div className='movie-summary-container'>
        <div className='item'>
            <div className='movie-caption'>{props.movie}</div>
            <div className='rate'>{props.price} EUR/Sitzplatz</div>
            <div className='time-caption'>{props.time}</div>
        </div>
    </div>
    );
}

export default MovieSummary;