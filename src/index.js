import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import registerServiceWorker from './registerServiceWorker';
import movieReducer from './store/reducers/movieReducer';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'

const rootReducer = combineReducers({
    movie : movieReducer

})

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
