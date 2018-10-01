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

export const showAuditorium = (auditorium_id) =>{
    return dispatch => {
        //Send a request
        axios.get('http://localhost:8001/wibas-eterate/ticket/api/v1/auditoria/'+auditorium_id)
        .then((res)=>{
            console.log('data came');

            if(res.data !== undefined && res.data.success){
                console.log('Passed to dispatch');
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

export const showPayment = () =>{
    return dispatch => {
        dispatch({type: SHOW_PAYMENT})
    }
}

export const onSeatUnBooked = (seatId) =>{
    return dispatch => {
        dispatch({type: SEAT_UNBOOKED, data: seatId});
    }
}

export const loadMovies = () =>{
    return (dispatch)=>{
        console.log('in dispatch');
        axios.get('http://localhost:8001/wibas-eterate/ticket/api/v1/movies')
        .then((res)=>{
            console.log('data came');

            if(res.data !== undefined && res.data.success){
                console.log('Passed to dispatch');
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