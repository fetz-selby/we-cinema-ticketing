import React from 'react';
import '../../styles/movie.css';

const MovieHeader = (props) =>{
    return <div className='movie-header'>
        <div className='postfix'>{'Name'}</div>
        <div className='caption'>{props.caption}</div>
        <div className='postfix'>{props.pref}</div>
    </div>
}


export default MovieHeader;
