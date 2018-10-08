import React from 'react';
import '../../styles/movie.css';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/actions';

const MovieSchedule = (props) =>{

    function onItemClicked(auditorium_id){
        props.showLoading();
        props.onTimeInvoked(auditorium_id);
    }

    return <div className='movie-scheduler-container'>
        <div className='title'>{props.day}</div>
        <ul className='movie-scheduler-items'>
            {props.times.map((time)=>{
                return (<li  className='movie-scheduler-sigle-item' onClick={()=> onItemClicked(time.auditorium_id) } key={time.time}>{time.time}</li>)
            })}
        </ul>

    </div>
}

const mapDispatchToProps = dispatch =>{
    return {
        onTimeInvoked : (auditoriumId) => dispatch(actionCreators.showAuditorium(auditoriumId)),
        showLoading : () => dispatch(actionCreators.loadingAuditorium())
    }
}

export default connect(null, mapDispatchToProps)(MovieSchedule);
