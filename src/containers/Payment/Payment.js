import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/actions';
import '../../styles/payment.css';
import PaymentSummary from '../../components/PaymentControls/PaymentSummary';
import NumberFormat from 'react-number-format';


class Payment extends Component{

    state = {
        name: '',
        cardNumber: '',
        code: '',
        month: '01',
        year: '2018',
        showCardError: true,
        showCodeError: true,
        showNameError: true,
        showMonthError: false,
        showYearError: true,
        showPayBtn: false
    }

    componentWillMount(){
        if(this.props.totalPrice === 0){
           window.location.href = '#/';
        }
    }

    loadMonth=()=>{
        //Create monts
        const months = [];
        for(let i=1; i<=12; i++){
            if(i < 10){
                months.push('0'+i);
            }else{
                months.push(i);
            }
        }

        return(
            <select className='select-month' value={this.state.month} onChange={this.onMonthChangeHandler}>
                {months.map((month)=>{
                    return <option key={month} value={month}>{month}</option>
                })}
            </select>
        )
    }

    loadYear=()=>{
        const todayYear = new Date().getFullYear();
        const years = [];

        //Let add 5 years from today
        for(let i=0; i<5; i++){
            years.push(todayYear+i);
        }

        return(
            <select className='select-year' value={this.state.year} onChange={this.onYearChangeHandler}>
                {years.map((year)=>{
                    return <option key={year} value={year}>{year}</option>
                })}
            </select>
        )
    }

    nameChangeHandler = (evt) =>{

        this.setState({
            name: evt.target.value
        })

        this.validate();
    }

    cardChangeHandler = (evt) =>{

        this.setState({
            cardNumber: evt.target.value
        })

        this.validate();
    }

    codeChangeHandler = (evt) =>{

        this.setState({
            code: evt.target.value
        })
        this.validate();
    }

    onMonthChangeHandler = (evt) =>{

        this.setState({
            month: evt.target.value
        })

        this.validate();
    }

    onYearChangeHandler = (evt) =>{

        this.setState({
            year: evt.target.value
        })
        this.validate();
    }

    validate = () =>{
        //Check if name field is empty
        

        if(this.state.name.trim().length < 5){
            this.setState({
                showNameError: true
            })

            return;
        }else{
            this.setState({
                showNameError: false
            })
        }

        //Check card number
        if(this.getNumber(this.state.cardNumber, ' ').length < 15){
            this.setState({
                showCardError: true
            })

            return;
        }else{
            this.setState({
                showCardError: false
            })
        }

        //Check date
        if(!this.isDateValid(this.state.month, this.state.year)){
            this.setState({
                showYearError: true
            })

            return;
        }else{
            this.setState({
                showYearError: false
            })
        }

        //Check code
        if(this.state.code.trim().length < 2){
            this.setState({
                showCodeError: true
            })

            return;
        }else{
            this.setState({
                showCodeError: false
            })
        }

        this.setState({
            showPayBtn: true
        })

    }

    isDateValid = (month, year) =>{
        const today =  new Date();
        const inputDate = new Date(parseInt(year), parseInt(month), 1);

        if(today > inputDate){
            return false;
        }
        return true;
    }

    onPayHandler = () =>{
        this.props.pay(this.props.reservedCode, 
            this.props.selectedSeats, 
            this.state.name, 
            this.getNumber(this.state.cardNumber, ' '), 
            this.state.code, 
            this.state.month, 
            this.state.year);
    }

    getNumber = (val, del) =>{
        if(val){
            const arr = val.split(del);
            let str = '';
            for(const ar of arr){
                str+=ar.trim();
            }
            return str;
        }
        return '';
    }

    PaymentPage = () =>{
        return (
        <div className='payment-page'>
            <div className='heading'>Bitte geben Sie Ihre Kreditkartendaten ein</div>
            <div className='field-container'>
                <div className='label'>Karteninhaber</div>
                <div className='input-container'>
                    <input type='text' className='inputs' value={this.state.name} onChange={this.nameChangeHandler} />
                    <div className={this.state.showNameError?'error':'hide'} >falsche Karteninhaber</div>
                </div>
            </div>

            <div className='field-container'>
                <div className='label'>Kartennummer</div>
                <div className='input-container'>
                    <NumberFormat className='inputs' format="#### #### #### ####" value={this.state.cardNumber} onChange={this.cardChangeHandler}/>
                    <div className={this.state.showCardError?'error':'hide'} >falsche Kartennummer</div>
                </div>
            </div>
        
            <div className='field-container'>
                <div className='label'>Gultig bis</div>
                <div className='input-container'>
                    {this.loadMonth()}
                    <div className={this.state.showMonthError?'error':'hide'}></div>
                </div>
                <div className='input-container'>
                    {this.loadYear()}
                    <div className={this.state.showYearError?'error':'hide'}>Abgelaufene Karte</div>
                </div>
            </div>

            <div className='field-container'>
                <div className='label'>Code</div>
                <div className='input-container'>
                    <NumberFormat className='input-code' format="###" value={this.state.code} onChange={this.codeChangeHandler}/>
                    <div className={this.state.showCodeError?'error':'hide'} >falsche Code</div>
                </div>
            </div>

            <div className='action-container'>
                <button className={this.state.showPayBtn?'pay-btn':'hide'} onClick={this.onPayHandler}>Weiter</button>
            </div>
        </div>
        )
    }

    moveHome = () =>{
        this.props.cancelBook(this.props.reservedCode);
    }
    
    render(){
        return(
        <div className='payment-container'>
            <div className='payment-sub-container'>
                <PaymentSummary numberOfSeats={this.props.numberOfSeats} totalPrice={this.props.totalPrice} ></PaymentSummary>
                {this.PaymentPage()}
            </div>
            <button className='home-btn' onClick={this.moveHome}>Home</button>
        </div>
        );
    }

}

const mapStateToProps = state =>{
    return {
        totalPrice: state.payment.totalPrice,
        movie: state.payment.movie,
        numberOfSeats: (state.payment.selectedSeats).length,
        reservedCode: state.payment.reservedCode,
        selectedSeats: state.payment.selectedSeats,
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        pay : (securedCode, seats, name, card, code, month, year)=>dispatch(actionCreators.makePayment(securedCode, seats, name, card, code, month, year)),
        cancelBook : (secureCode)=>dispatch(actionCreators.cancelSeat(secureCode))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
