import render from '../lib/server/renderer';
import sHelpers from 'serverless-helpers-js';
import 'babel-polyfill'; 

sHelpers.loadEnv();

export function handler(event, context) {
  
  // Logging here
  // console.log('event', event);
  // console.log('context', context);
  
  const userId = null;
  const isDev = event.isServerlessOffline;
  let urlWithQuery;
  
  if (isDev) urlWithQuery = event.path;
  else {
    const path = [event.pathKey1, event.pathKey2, event.pathKey3, event.pathKey4, event.pathKey5]
      .filter(x => x)
      .join('/');
    urlWithQuery = `/${path}${(event.queryString ? '?' + event.queryString : '')}`;
  }
  
  render(urlWithQuery, userId, isDev)
    .then(response => context.succeed(response))
    .catch(error => context.fail(error));
}
