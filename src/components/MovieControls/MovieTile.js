import MovieTitle from './MovieTitle';
import MovieScheduler from './MovieSchedule';

const MovieTile = (props) =>{
    return (
    <div className='movie-tile-container'>
        <MovieTitle title={props.title}></MovieTitle>
        {renderScheduler(props.days)}
    </div>
    );
}

renderScheduler = (days) => {
    return <div> 
    
            {days.map((day)=>{
                <MovieScheduler day={day.day} times={day.times}></MovieScheduler>
            })}
    </div>
}

export default MovieTile;