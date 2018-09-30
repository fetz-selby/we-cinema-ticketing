
const MovieSchedule = (props) =>{
    return <div className='movie-scheduler-item'>
        <div className='title'>{props.day}</div>
        <ul>
            {props.times.map((time)=>{
                return (<li key={time.id}></li>)
            })}
        </ul>

    </div>
}

export default MovieSchedule;
