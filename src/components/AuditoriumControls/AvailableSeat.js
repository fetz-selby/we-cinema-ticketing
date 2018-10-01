import React from 'react';
import '../../styles/auditorium.css';
import * as actionCreators from '../../store/actions/actions';
import {connect} from 'react-redux';

const AvailableSeat = (props) =>{
    
    return (
    <li className='unselected-seat-item' onClick={()=>props.onSeatSelect(props.seatId)}>
    
    </li>
    );
}

const mapDispatchToProps = dispatch =>{
    return {
        onSeatSelect : (seatId) => dispatch(actionCreators.onSeatBooked(seatId)),
    }
}

export default connect (null, mapDispatchToProps)(AvailableSeat);