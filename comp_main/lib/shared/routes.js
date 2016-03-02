import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import TestPage from './components/TestPage';
import LandingPage from './components/LandingPage';
import NewAdventurePage from './components/NewAdventurePage';
import NotFound from './components/NotFound';

export default (
  
  <Route path='/dev' component={App}>
    <IndexRoute component={LandingPage} />
    <Route path="test" component={TestPage} />
    <Route path="new_adventure" component={NewAdventurePage} />
    
    <Route path="*" component={NotFound} />
  </Route>
  
);