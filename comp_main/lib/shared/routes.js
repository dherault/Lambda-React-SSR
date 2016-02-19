import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import TestPage from './components/TestPage';
import LandingPage from './components/LandingPage';
import NotFound from './components/NotFound';

export default (
  
  <Route path='/dev' component={App}>
    <IndexRoute component={LandingPage} />
    <Route path="test" component={TestPage} />
    
    <Route path="*" component={NotFound} />
  </Route>
  
);