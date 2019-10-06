import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

import { reducer } from './redux';
import { watcherSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();

// apply redux-saga as middleware
let store = createStore(reducer, applyMiddleware(sagaMiddleware));

// run watcherSaga here so that it can trigger the saga when
// there is an API_CALL_REQUEST
sagaMiddleware.run(watcherSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
