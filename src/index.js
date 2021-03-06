import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import registerServiceWorker from './registerServiceWorker';
import movieReducer from './store/reducers/movieReducer';
import auditoriumReducer from './store/reducers/auditoriumReducer';
import paymentReducer from './store/reducers/paymentReducer';

import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

const logger = store => {
    return next => {
        return action => {
            next(action);
        }
    }
}

const rootReducer = combineReducers({
    movie : movieReducer,
    auditorium : auditoriumReducer,
    payment : paymentReducer
})


const store = createStore(rootReducer, applyMiddleware(logger, thunk));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
