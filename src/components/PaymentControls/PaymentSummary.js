import React from 'react';
import '../../styles/payment.css';
import currencyFormatter from 'currency-formatter';

const PaymentSummary = (props) => {

    function parseCurrency(props){
        return currencyFormatter.format(props.totalPrice, { code: 'EUR' });

    }

    return (
        <div className='payment-summary'>
            <div className='greeting'>Hallo,</div>
            <div className='message'>Sie bezahlen {props.numberOfSeats} Plätze, die {parseCurrency(props)} kosten</div>
        </div>
    )
}

export default PaymentSummary;