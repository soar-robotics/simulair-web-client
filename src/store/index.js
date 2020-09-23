import {applyMiddleware, compose, createStore} from "redux";
import reduxThunk from "redux-thunk";
import reducers from './reducers';

// for dev purposes
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));

export default store;