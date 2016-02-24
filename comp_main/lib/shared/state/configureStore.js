import React from 'react';
import { routerReducer } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// RouterContext gets imported to client for now;

import { log } from '../utils/logger';
import onServer from '../utils/onServer';
import reducers from './reducers';
import promiseMiddleware from './promiseMiddleware';


// This is not universal enough !!! To be refactored
export default function configureStore(initialState = {}) {
  
  log('Initializing store');
  
  let enhancer, reducer;
  
  if (onServer) {
    enhancer = applyMiddleware(promiseMiddleware);
    reducer = combineReducers(reducers);
    
  } else {
    enhancer = compose(
      applyMiddleware(promiseMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    );
    reducer = combineReducers(Object.assign({ routing: routerReducer }, reducers));
  }
  
  const store = createStore(reducer, initialState, enhancer);
  
  // Enables Webpack hot module replacement for reducers
  if (module.hot) module.hot.accept('./reducers.js', () => store.replaceReducer(require('./reducers.js')));
  
  return store;
}
