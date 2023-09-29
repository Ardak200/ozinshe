import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import usersReducer from '../reducers/usersReducers';
import messages from '../reducers/messages';
import logger from 'redux-logger'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            message: messages,
            usersReducer,
        }),
        composeWithDevTools((applyMiddleware(thunk))),
    );

    return store;
};