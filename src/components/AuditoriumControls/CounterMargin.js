import React from 'react';
import '../../styles/auditorium.css';

const CounterMargin = (props) =>{
    return (
    <li className='margin-seat-item'>
    {props.count}
    </li>
    );
}

export default CounterMargin;