import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/actions';
import '../../styles/auditorium.css';
import _ from 'lodash';
import AvailableSeat from '../../components/AuditoriumControls/AvailableSeat';
import BookedSeat from '../../components/AuditoriumControls/BookedSeat';
import BlankSeat from '../../components/AuditoriumControls/BlankSeat';
import PaidSeat from '../../components/AuditoriumControls/PaidSeat';
import CounterMargin from '../../components/AuditoriumControls/CounterMargin';
import MovieSummary from '../../components/AuditoriumControls/MovieSummary';

import TotalSeatPrice from '../../components/AuditoriumControls/TotalSeatPrice';

class Auditorium extends Component{
    
    renderSeats = () => {
        console.log(this.props.seats);
        if(this.props.seats.length === 0){
            window.location.href = '#/';
            return;
        }
        //Create a metrix
        const matrix = [];
        for(let i=1; i<=this.props.ySize; i++){
            let elements = [];

            //Add counter margin
            elements.push(<CounterMargin count={i}></CounterMargin>)
            for(let j=1; j<=this.props.xSize; j++){

                //Check in seats if exist
                const seat = _.find(this.props.seats, {row : i, column: j});
                if(seat && seat.status === 'A'){
                    //Render Available
                    elements.push(<AvailableSeat seatId={seat.id}></AvailableSeat>);
                }else if(seat && (seat.status === 'B' || seat.status === 'P')){
                    //Render Booked
                    elements.push(<PaidSeat seatId={seat.id}></PaidSeat>);
                }else if(seat && (seat.status === 'T')){
                    //Render Booked
                    elements.push(<BookedSeat seatId={seat.id}></BookedSeat>);
                }else{
                    //Render Blank
                    elements.push(<BlankSeat seatId={(i*j)}></BlankSeat>);
                }
            }

            matrix.push(<ul className='seat-container'>{elements}</ul>);
        }

        return matrix;
    }

    render(){
        return(
        <div className='auditorium-container'>
            <MovieSummary movie={this.props.movie} time={this.props.time}></MovieSummary>
            {this.renderSeats()}
            <TotalSeatPrice price={this.props.totalPrice}></TotalSeatPrice>
            <div className='footer-container'>
                <button className='payment-action-btn' onClick={()=>this.props.showPayment()}>Buchen</button>
            </div>
            
        </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
       auditoriumName : state.auditorium.auditorium_name,
       xSize : state.auditorium.x_size,
       ySize : state.auditorium.y_size,
       seats : state.auditorium.seats,
       time : state.auditorium.time,
       price : state.auditorium.price,
       day : state.auditorium.day,
       movie : state.auditorium.movie,
       totalPrice : state.auditorium.totalPrice
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        showPayment: ()=>dispatch(actionCreators.showPayment())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auditorium);
