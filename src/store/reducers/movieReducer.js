import * as actionTypes from '../actions/actions';

const initialState = {
    movies: [],
    isLoading: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.MOVIES_LOADED:{
            const movies = action.data;
            return {
                ...state,
                movies,
                isLoading: false
            }
        }

        case actionTypes.AUDITORIUM_LOADING:{
            return {
                ...state,
                isLoading: true
            }
        }

        default: 
        return {...state}
    }
}

export default reducer;