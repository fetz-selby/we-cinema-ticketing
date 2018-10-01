import React from 'react';
import '../../styles/auditorium.css';

const TotalSeatPrice = (props) =>{
    return (
        <ul className='total-seat-price'>
          
           <li className='total-price-text'>Gesamtsumme </li>
           <li className='total-price-value'>{props.price}</li>
           <li className='total-price-currency'>EUR</li>
        </ul>
    );
}

export default TotalSeatPrice;