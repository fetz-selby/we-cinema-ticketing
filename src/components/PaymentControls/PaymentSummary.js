import React from 'react';
import '../../styles/payment.css';

const PaymentSummary = (props) => {

    return (
        <div className='payment-summary'>
            <div className='greeting'>Hallo,</div>
            <div className='message'>Sie bezahlen {props.numberOfSeats} Plätze, die {props.totalPrice} EUR kosten</div>
        </div>
    )
}

export default PaymentSummary;