import React from 'react';
import * as actionCreators from '../../store/actions/actions';
import {connect} from 'react-redux';
import '../../styles/auditorium.css';

const BookedSeat = (props) =>{
    return (
    <li className='selected-seat-item' onClick={()=>props.onSeatSelect(props.seatId)}>
    B
    </li>
    );
}

const mapDispatchToProps = dispatch =>{
    return {
        onSeatSelect : (seatId) => dispatch(actionCreators.onSeatUnBooked(seatId)),
    }
}

export default connect (null, mapDispatchToProps)(BookedSeat);