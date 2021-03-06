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
import AuditoriumTitle from '../../components/AuditoriumControls/AuditoriumTitle';
import Overlay from '../../components/Misc/Overlay';

class Auditorium extends Component{

    componentWillMount(){
        if(this.props.reservedCode){
            window.location.href = '#/zahlung';
        }
    }
    
    renderSeats = () => {
        if(this.props.seats.length === 0){
            window.location.href = '#/';
            return;
        }
        //Create a metrix
        const matrix = [];
        let key = 0;
        for(let i=1; i<=this.props.ySize; i++){
            let elements = [];
            key++;
            //Add counter margin
            elements.push(<CounterMargin key={i} count={i}></CounterMargin>)
            for(let j=1; j<=this.props.xSize; j++){

                key ++;
                //Check in seats if exist
                const seat = _.find(this.props.seats, {row : i, column: j});
                if(seat && seat.status === 'A'){
                    //Render Available
                    elements.push(<AvailableSeat key={key} seatId={seat.id}></AvailableSeat>);
                }else if(seat && (seat.status === 'B' || seat.status === 'P')){
                    //Render Booked
                    elements.push(<PaidSeat key={key} seatId={seat.id}></PaidSeat>);
                }else if(seat && (seat.status === 'T')){
                    //Render Booked
                    elements.push(<BookedSeat key={key} seatId={seat.id}></BookedSeat>);
                }else{
                    //Render Blank
                    elements.push(<BlankSeat key={key} seatId={(i*j)}></BlankSeat>);
                }
            }

            matrix.push(<ul key={i} className='seat-container'>{elements}</ul>);
        }

        return matrix;
    }

    showPaymentButton = () =>{
        if(this.props.totalPrice > 0){
            return (
                <button className='payment-action-btn' onClick={this.moveToNext}>Buchen</button>
            )
        }else{
            return null
        }
        
    }

    moveToNext = () =>{
        this.props.loadingPayment();
        this.props.reserveSeat(this.props.selectedSeats,
                                this.props.movie,
                                this.props.totalPrice);
    }

    render(){
            return(
                <div className='auditorium-container'>
                    <div className='auditorium-header-container'>
                        <MovieSummary movie={this.props.movie} time={this.props.time} price={this.props.price}></MovieSummary>
                        <AuditoriumTitle title={this.props.auditoriumName}></AuditoriumTitle>
                    </div>
                    {this.renderSeats()}
                    <TotalSeatPrice price={this.props.totalPrice}></TotalSeatPrice>
                    <div className='footer-container'>
                    {this.showPaymentButton()}
                    </div>
                    <Overlay isLoading={this.props.isLoading}></Overlay>
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
       totalPrice : state.auditorium.totalPrice,
       selectedSeats : state.auditorium.selectedSeats,
       reservedCode : state.auditorium.reservedCode,
       isLoading: state.auditorium.isLoading
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        loadingPayment: ()=>dispatch(actionCreators.loadingPayment()),
        reserveSeat: (selectedSeats, movie, totalPrice)=>dispatch(actionCreators.reserveSeat(selectedSeats, movie, totalPrice))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auditorium);
