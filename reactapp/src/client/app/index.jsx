import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, Link, browserHistory, IndexRoute, IndexRedirect  } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import { DEFAULT_APP_STATE } from './constants'

import { naviguationReducer } from './reducers'

import { Account, AccountSheet, Operation, Home } from './component';

import App from './App.jsx';

const reducers = combineReducers({
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

const middleware = applyMiddleware(errorHandler);

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
                <IndexRedirect to="/home" />
                <Route path="home" component={Home} />
                <Route path="account/:account_id" component={Account} />
                <Route path="account/:account_id/sheet/:sheet_id" component={AccountSheet} />
                <Route path="account/:account_id/sheet/:sheet_id/operation" component={Operation} />

                <Route path="account" component={Account} />
                <Route path="sheet" component={AccountSheet} />
                <Route path="operation" component={Operation} />
            </Route>
        </Router>
    </Provider>

), document.getElementById('app'));
