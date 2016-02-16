/**
 * Serverless Module: Lambda Handler
 * - Your lambda functions should be a thin wrapper around your own separate
 * modules, to keep your code testable, reusable and AWS independent
 * - 'serverless-helpers-js' module is required for Serverless ENV var support.  Hopefully, AWS will add ENV support to Lambda soon :)
 */

import render from '../lib/server/renderer';
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
    const path = [event.pathKey1, event.pathKey2, event.pathKey3, event.pathKey4, event.pathKey5]
      .filter(x => x)
      .join('/');
    urlWithQuery = `/${path}${(event.queryString ? '?' + event.queryString : '')}`;
  }
  
  render(urlWithQuery, userId)
    .then(response => context.succeed(response))
    .catch(error => context.fail(error));
}
