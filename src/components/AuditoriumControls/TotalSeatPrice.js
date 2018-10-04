import React from 'react';
import currencyFormatter from 'currency-formatter';
import '../../styles/auditorium.css';

const TotalSeatPrice = (props) =>{

    function parseCurrency(props){
        return currencyFormatter.format(props.price, { code: 'EUR' });

    }

    return (
        <ul className='total-seat-price'>
          
           <li className='total-price-text'>Gesamtsumme </li>
           <li className='total-price-value'>{parseCurrency(props)}</li>
        </ul>
    );
}

export default TotalSeatPrice;