import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import registerShortcuts from './registerShortcuts';
import registerSideEffects from './registerSideEffects';
import routes from '../../comp_main/lib/shared/routes';
import { logStart, log } from '../../comp_main/lib/shared/utils/logger';
import configureStore from '../../comp_main/lib/shared/state/configureStore';

logStart('Hello client!');

// App creation
const store = configureStore(window.STATE_FROM_SERVER);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root'),
  () => log('App rendered')
);

registerSideEffects(store); // Side effects init
registerShortcuts(store); // Keyboard shortcuts init

if (process.env.NODE_ENV !== 'production') require('./stylesheets/app.css');
