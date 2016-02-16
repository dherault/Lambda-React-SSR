/**
 * Serverless Module: Lambda Handler
 * - Your lambda functions should be a thin wrapper around your own separate
 * modules, to keep your code testable, reusable and AWS independent
 * - 'serverless-helpers-js' module is required for Serverless ENV var support.  Hopefully, AWS will add ENV support to Lambda soon :)
 */

import render from '../lib/renderer';
import 'babel-polyfill'; 

// Lambda Handler
export function handler(event, context) {
  
  // Logging here
  // console.log('event', event);
  // console.log('context', context);
  const userId = null;
  let urlWithQuery;
  
  if (event.isServerlessServe) urlWithQuery = event.originalUrl;
  else {
    // const queryString = event.queryString.slice(1, -1);
    // urlWithQuery = event.resourcePath + (queryString ? '?' + queryString : '');
    urlWithQuery = event.resourcePath + (event.queryString ? '?' + event.queryString : '');
  }
  
  // const keys = Object.keys(event.params);
  // context.succeed(event);
  
  // const render = () => Promise.resolve('Hey!');
  
  render(urlWithQuery, userId)
    .then(response => context.succeed(response))
    .catch(error => context.fail(error));
}
