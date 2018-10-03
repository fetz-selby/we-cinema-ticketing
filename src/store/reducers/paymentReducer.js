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
    reservedCode: '',
    pdf: null
}

const reducer = (state = initialState, action) => {
    switch(action.type){

        case actionTypes.SHOW_PAYMENT:{
            const totalPrice = action.data.totalPrice;
            const selectedSeats = action.data.selectedSeats;
            const movie = action.data.movie;
            const reservedCode = action.data.reservedCode;

            //Redirect
            window.location.href = '#/zahlung'

            return {
                ...state,
                movie,
                totalPrice,
                selectedSeats,
                reservedCode
            }
        }

        case actionTypes.PAYMENT_SUCCESS:{
            console.log('Payment GINX');
            const pdf = new Blob([action.data], {type:"application/pdf"});
            window.location.href = '#/quittung'
            return {
                ...state,
                pdf
            }
        }

        default: 
        return {...state}
    }
}

export default reducer;