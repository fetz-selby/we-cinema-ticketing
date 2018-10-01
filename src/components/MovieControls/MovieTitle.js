import React from 'react';
import '../../styles/movie.css';

const MovieTitle = (props) =>{
    return <div className='movie-title-item'>
        {props.title}
    </div>
}

export default MovieTitle;