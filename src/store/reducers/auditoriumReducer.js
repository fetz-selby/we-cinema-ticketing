import * as actionTypes from '../actions/actions';
import _ from 'lodash';

const initialState = {
    auditorium_id: 0,
    auditorium_name: '',
    movie: '',
    x_size: 0,
    y_size: 0,
    price: 0.0,
    day: '',
    time: '',
    seats: [],
    selectedSeats: [],
    totalPrice: 0.0,
    reservedCode: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type){

        case actionTypes.SHOW_AUDITORIUM:{
            const auditorium = action.data;
            const auditorium_id = auditorium.auditorium_id;
            const auditorium_name = auditorium.auditorium_name;
            const x_size = auditorium.size.x_size;
            const y_size = auditorium.size.y_size;
            const time = auditorium.time;
            const day = auditorium.day;
            const seats = auditorium.seats;
            const movie = auditorium.movie_name;
            const price = auditorium.price;
            const selectedSeats = [];
            const totalPrice = 0.00;
            const reservedCode = '';

            //Redirect
            window.location.href = '#/belegungsplan'

            return {
                ...state,
                auditorium_id,
                auditorium_name,
                x_size,
                y_size,
                time,
                day,
                seats,
                movie,
                price,
                totalPrice,
                selectedSeats,
                reservedCode
            }
        }

        case actionTypes.SEAT_BOOKED: {
            const seat = _.find(state.seats, {id: action.data});
            seat.status = 'T';

            const selectSeats = [...state.selectedSeats].concat(seat.id);
            const totalPrice = state.price * selectSeats.length;

            const seatIndex = _.findIndex(state.seats, {id: action.data});


            let head = [...state.seats].slice(0, seatIndex);
            let tail = [...state.seats].slice(seatIndex+1);

            head.push(seat);

            return {
                ...state,
                seats : head.concat(tail),
                selectedSeats: selectSeats,
                totalPrice
            };
        }

        case actionTypes.SEAT_RESERVED:{
            const reservedCode = action.data.code;

            return {
                ...state,
                reservedCode
            }

        }

        case actionTypes.NO_SEAT_RESERVED:{
            alert('gebucht');
            window.location.href = '#/';
            return {
                ...state
            }
        }

        case actionTypes.RESERVE_ERROR:{
            alert('gebucht');
            window.location.href = '#/';
            return {
                ...state
            }
        }
         
        case actionTypes.SEAT_UNBOOKED: {
            const seat = _.find(state.seats, {id: action.data});
            seat.status = 'A';

            const selectSeats = [...state.selectedSeats].filter((id)=>{
                if(id !== seat.id){
                    return true;
                }
                return false;
            })
            const totalPrice = state.price * selectSeats.length;


            const seatIndex = _.findIndex(state.seats, {id: action.data});


            let head = [...state.seats].slice(0, seatIndex);
            let tail = [...state.seats].slice(seatIndex+1);

            head.push(seat);

            return {
                ...state,
                seats : head.concat(tail),
                selectedSeats: selectSeats,
                totalPrice
            };
        }

        default: 
        return {...state}
    }
}

export default reducer;