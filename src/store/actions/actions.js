import axios from 'axios';

export const SHOW_AUDITORIUM = 'SHOW_AUDITORIUM';
export const NO_AUDITORIUM = 'NO_AUDITORIUM';
export const AUDITORIUM_ERR = 'AUDITORIUM_ERR';
export const MOVIES_LOADED = 'MOVIES_LOADED';
export const NO_MOVIES_AVAILABLE = 'NO_MOVIES_AVAILABLE';
export const MOVIES_ERR = 'MOVIES_ERR';
export const SEAT_BOOKED = 'SEAT_BOOKED';
export const SEAT_UNBOOKED = 'SEAT_UNBOOKED';
export const SHOW_PAYMENT = 'SHOW_PAYMENT';
export const SEAT_RESERVED = 'SEAT_RESERVED';
export const NO_SEAT_RESERVED = 'NO_SEAT_RESERVED';
export const RESERVE_ERROR = 'RESERVE_ERROR';
export const PAYMENT_SUCCESS = 'PAYMENT_SUCCESS';
export const PAYMENT_FAILED = 'PAYMENT_FAILED';
export const PAYMENT_ERROR = 'PAYMENT_ERROR';

export const showAuditorium = (auditorium_id) =>{
    return dispatch => {
        //Send a request
        axios.get('http://localhost:8001/wibas-eterate/ticket/api/v1/auditoria/'+auditorium_id)
        .then((res)=>{

            if(res.data !== undefined && res.data.success){
                dispatch({
                    type : SHOW_AUDITORIUM,
                    data: res.data.result[0]
                });
            }else{
                dispatch({
                    type : NO_AUDITORIUM,
                    data: null
                });
            }
        }).catch(()=>{
            dispatch({
                type : AUDITORIUM_ERR,
                data: null
            });
        });
    }
}

export const onSeatBooked = (seatId) =>{
    return dispatch => {
        dispatch({type: SEAT_BOOKED, data: seatId});
    }
}

export const showPayment = (selectedSeats, movie, totalPrice, reservedCode) =>{
    return dispatch => {
        dispatch({type: SHOW_PAYMENT, data: {selectedSeats, movie, totalPrice, reservedCode}})
    }
}

export const makePayment = (securedCode, seat, name, card, code, month, year) =>{
    return dispatch => {
        // axios({
        //     method:'post',
        //     url:'http://localhost:8001/wibas-eterate/ticket/api/v1/purchase_ticket',
        //     responseType:'blob',
        //     data : {fullname:name,card,code,expire_month:month,expire_year:year,seat,gen_code:securedCode},
        //     headers: {'Content-Type': 'application/pdf'}
        //     })
        //     .then((res)=>{
        //         if(res.data !== null){
        //             dispatch({
        //                 type : PAYMENT_SUCCESS,
        //                 data: res.data
        //             });
        //         }else{
        //             dispatch({
        //                 type : PAYMENT_FAILED,
        //                 data: null
        //             });
        //         }     
        //     }).catch(()=>{
        //         dispatch({
        //             type : PAYMENT_ERROR,
        //             data: null
        //         });
        //     })

        axios.post('http://localhost:8001/wibas-eterate/ticket/api/v1/purchase_ticket', 
        {fullname:name,
            card,
            code,
            expire_month:month,
            expire_year:year,
            seat,
            gen_code:securedCode
        }, {
            // responseType: 'arraybuffer',
            responseType: 'blob',
            headers: {
              'Accept': 'application/pdf'
            }})
        .then((res)=>{

            if(res.data !== undefined){
                dispatch({
                    type : PAYMENT_SUCCESS,
                    data: res.data
                });
            }else{
                dispatch({
                    type : PAYMENT_FAILED,
                    data: null
                });
            }
        }).catch(()=>{
            dispatch({
                type : PAYMENT_ERROR,
                data: null
            });
        });
    }
}

export const reserveSeat = (selectedSeats) => {
    return dispatch => {
        const seats = selectedSeats;
        axios.post('http://localhost:8001/wibas-eterate/ticket/api/v1/secure_ticket', {seats})
        .then((res)=>{

            if(res.data !== undefined && res.data.success){
                dispatch({
                    type : SEAT_RESERVED,
                    data: res.data.result
                });
            }else{
                dispatch({
                    type : NO_SEAT_RESERVED,
                    data: null
                });
            }
        }).catch(()=>{
            dispatch({
                type : RESERVE_ERROR,
                data: null
            });
        });

    }
}

export const onSeatUnBooked = (seatId) =>{
    return dispatch => {
        dispatch({type: SEAT_UNBOOKED, data: seatId});
    }
}

export const loadMovies = () =>{
    return (dispatch)=>{
        axios.get('http://localhost:8001/wibas-eterate/ticket/api/v1/movies')
        .then((res)=>{

            if(res.data !== undefined && res.data.success){
                dispatch({
                    type : MOVIES_LOADED,
                    data: res.data.result
                });
            }else{
                dispatch({
                    type : NO_MOVIES_AVAILABLE,
                    data: null
                });
            }
        }).catch(()=>{
            dispatch({
                type : MOVIES_ERR,
                data: null
            });
        });
    }
}