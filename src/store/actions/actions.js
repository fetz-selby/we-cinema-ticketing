export const SHOW_AUDITORIUM = 'SHOW_AUDITORIUM';

export const showAuditorium = (id) =>{
    return dispatch => {
        //Send a request
        dispatch({type: SHOW_AUDITORIUM, data : null});
    }
}