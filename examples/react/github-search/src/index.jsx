import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { reduxObservable } from 'redux-observable';
import rootReducer from './reducers';
import App from './components/App';

const store = createStore(rootReducer, applyMiddleware(reduxObservable()));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
