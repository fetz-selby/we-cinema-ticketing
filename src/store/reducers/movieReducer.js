import * as actionTypes from '../actions/actions';

const initialState = {
    movies: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.MOVIES_LOADED:{
            const movies = action.data;
            return {
                ...state,
                movies
            }
        }

        default: 
        return {...state}
    }
}

export default reducer;