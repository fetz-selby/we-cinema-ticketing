import * as actionTypes from '../actions/actions';

const initialState = {
    totalPrice: 0,
    selectedSeats: [],
    movie: '',
    name: '',
    cardNumber: '',
    code: '',
    month: '',
    year: '',
    reservedCode: null,
    pdf: null
}

const reducer = (state = initialState, action) => {
    switch(action.type){

        case actionTypes.SHOW_PAYMENT:{
            const totalPrice = action.data.totalPrice;
            const selectedSeats = action.data.selectedSeats;
            const movie = action.data.movie;
            const reservedCode = action.data.reservedCode;

            return {
                ...state,
                movie,
                totalPrice,
                selectedSeats,
                reservedCode
            }
        }

        case actionTypes.PAYMENT_SUCCESS:{
            const pdf = new Blob([action.data], {type:"application/pdf"});
            window.location.href = '#/quittung'
            return {
                ...state,
                pdf
            }
        }

        case actionTypes.PAYMENT_FAILED:{
            alert('Zahlungsfehler');
            window.location.href = '#/';

            return {
                ...state
            }
        }

        case actionTypes.SEAT_RESERVED:{
            const reservedCode = action.data.code;
            const movie = action.data.movie;
            const totalPrice = action.data.totalPrice;
            const selectedSeats = action.data.selectedSeats;

            console.log('code => '+reservedCode);

            window.location.href = '#/zahlung';

            return {
                ...state,
                reservedCode,
                movie,
                totalPrice,
                selectedSeats
            }
        }

        case actionTypes.PAYMENT_FAILED:{
            window.location.href = '#/';
            return {
                ...state
            }
        }

        case actionTypes.SEAT_CANCELLED: {
            window.location.href = '#/';
            return {
                ...state
            }
        }

        default: 
        return {...state}
    }
}

export default reducer;