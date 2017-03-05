import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import promise from 'redux-promise-middleware'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import { DEFAULT_APP_STATE } from './constants'

import { naviguationReducer, modalReducer, snackbarReducer } from './reducers'

import { Account, AccountSheet, Operation, Home } from './component';

import App from './App.jsx';

const reducers = combineReducers({
    modal: modalReducer,
    snackbar: snackbarReducer,
    naviguation: naviguationReducer,
    routing: routerReducer
})

/* Middleware */
const errorHandler = (store) => (next) => (action) => {
    try {
        next(action);
    } catch (e) {
        console.log('Exception catched:', e);
    }
}

const middleware = applyMiddleware(errorHandler, promise(), thunk, logger());

// Add the reducer to your store on the `routing` key
const store = createStore(reducers, DEFAULT_APP_STATE, middleware);

store.subscribe(() => {
    console.log('store.subscribe: ', store.getState());
})

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" store={store} component={App}>
                <IndexRoute component={Home} />
                <Route path="home" component={Home} />
                <Route path="account/:account_id" component={Account} />
                <Route path="account/:account_id/sheet/:sheet_id" component={AccountSheet} />
                <Route path="account/:account_id/sheet/:sheet_id/operation/:operation_id" component={Operation} />

                <Route path="account" component={Account} />
                <Route path="sheet" component={AccountSheet} />
                <Route path="operation" component={Operation} />
                <Route path="operation/new" component={Operation} />
            </Route>
        </Router>
    </Provider>

), document.getElementById('app'));
