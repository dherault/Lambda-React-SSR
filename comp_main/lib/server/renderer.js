import React from 'react';
import { renderToString } from 'react-dom/server';
import { match } from 'react-router';
import isPlainObject from 'lodash.isplainobject';

import generateHTML from './generateHTML';
import routes from '../shared/routes';
import createApp from '../shared/createApp';
import { logRendering, logError } from '../shared/utils/logger';

const log = logRendering;

export default function render(location, userId) {
  
  return new Promise((resolve, reject) => {
    
    // const mountMeImFamous = renderToString(<App />);
    // const html = generateHTML(mountMeImFamous);
    
    
    const initialState = {};
    
    match({ routes, location }, (err, redirectLocation, renderProps) => {
    
      if (err) return reject(err); // Needs attention
      else if (redirectLocation) return reject('Someone please implement redirection');
      else if (renderProps) {
        
        // App creation
        const { store, userInterface } = createApp(initialState, renderProps);
        
        try {
          var mountMeImFamous = renderToString(userInterface);
        }
        catch (err) {
          return reject(err);
        }
        
        // Phidippides took charge of populating the state
        const serverState = store.getState();
        
        // serverState trimming to save brandwith
        ['records'].forEach(key => delete serverState[key]); // Goodbye useless keys
        for (let key in serverState) {
          if (isPlainObject(serverState[key]) && !Object.keys(serverState[key]).length) delete serverState[key]; // Goodbye empty keys
        }
        
        resolve(generateHTML(mountMeImFamous, serverState));
      }
      else return reject('Someone please implement 404');
    });
  });
}
