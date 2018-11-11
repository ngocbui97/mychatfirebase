import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import firebase from 'firebase'
import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import { reactReduxFirebase, firebaseReducer, getFirebase } from 'react-redux-firebase'
import { BrowserRouter} from 'react-router-dom';

const rootReducer = combineReducers({
    firebase: firebaseReducer,
});

var config = {
    // apiKey: "AIzaSyDTm5kSJVmVQsaSKg1TMfnjyX2AYnG6KVQ",
    // authDomain: "mywebchat1512350.firebaseapp.com",
    // databaseURL: "https://mywebchat1512350.firebaseio.com",
    // projectId: "mywebchat1512350",
    // storageBucket: "mywebchat1512350.appspot.com",
    // messagingSenderId: "73844307258"
    apiKey: "AIzaSyDA4gPpLg6LoDkI_UtRcU4lksjuL6dI7f8",
    authDomain: "app-chat-v01.firebaseapp.com",
    databaseURL: "https://app-chat-v01.firebaseio.com",
    projectId: "app-chat-v01",
    storageBucket: "app-chat-v01.appspot.com",
    messagingSenderId: "669411419047"
  };
firebase.initializeApp(config)

const rrfConfig = { 
    userProfile: 'users',
}

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig)
)(createStore); 
const initialState = {}
export const store = createStoreWithFirebase(rootReducer, initialState);
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
, document.getElementById('root'))