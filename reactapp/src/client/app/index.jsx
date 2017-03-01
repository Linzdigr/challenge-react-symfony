import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import { Account, AccountSheet, Operation } from './component';

import App from './App.jsx';

// Add the reducer to your store on the `routing` key
const store = createStore(
    combineReducers({
        // reducer def here
        routing: routerReducer
    })
)

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Account} />
                <Route path="account" component={Account} />
                <Route path="sheet" component={AccountSheet} />
                <Route path="operation" component={Operation} />
            </Route>
        </Router>
    </Provider>

), document.getElementById('app'))
