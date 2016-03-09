import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import isPlainObject from 'lodash.isplainobject';

import generateHTML from './generateHTML';
import routes from '../../shared/routes';
import configureStore from '../../shared/state/configureStore';
import { logRendering } from '../../shared/utils/logger';

const log = logRendering;

export default function render(location, userId) {
  
  return new Promise((resolve, reject) => {
    
    match({ routes, location }, (err, redirectLocation, renderProps) => {
      
      if (err) return reject(err); // Needs attention
      else if (redirectLocation) return reject('Someone please implement redirection');
      else if (renderProps) {
        
        // console.log(Object.keys(renderProps));
        // console.log(renderProps.components[1].name)
        
        let is404 = false;
        
        // A bit fragile
        renderProps.components.forEach(component => {
          if (typeof component.getName === 'function' && component.getName() === 'NotFound') is404 = true;
        });
        // console.log('is404:', is404);
        
        // App creation
        const store = configureStore(/*initialState*/);
        
        try {
          var mountMeImFamous = renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          );
        }
        catch (err) {
          return reject(err);
        }
        
        // Some piece of code should take charge of populating the state
        const serverState = store.getState();
        
        // serverState trimming to save brandwith
        ['records'].forEach(key => delete serverState[key]); // Goodbye useless keys
        for (let key in serverState) {
          if (isPlainObject(serverState[key]) && !Object.keys(serverState[key]).length) delete serverState[key]; // Goodbye empty keys
        }
        
        const html = generateHTML(mountMeImFamous, serverState, is404);
        
        return is404 ? reject(html) : resolve(html);
      }
      else return reject('Someone please implement 404 outside of routes');
    });
  });
}
