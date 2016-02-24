import 'babel-polyfill'; 
import sHelpers from 'serverless-helpers-js';
import render from '../lib/server/rendering/render';
import onLambda from '../lib/server/utils/onLambda';

sHelpers.loadEnv();

export function handler(event, context) {
  
  // Logging here
  // console.log('event', event);
  // console.log('context', context);
  
  const userId = null;
  let urlWithQuery;
  
  // URL retrieval
  if (!onLambda) urlWithQuery = event.url.path;
  else {
    const path = [event.pathKey1, event.pathKey2, event.pathKey3, event.pathKey4, event.pathKey5]
      .filter(x => x)
      .join('/');
    urlWithQuery = `/dev/${path}${(event.queryString ? '?' + event.queryString : '')}`;
  }
  
  render(urlWithQuery, userId)
    .then(response => context.succeed(response))
    .catch(error => context.fail(error));
  
  // context.fail(new Error('Yolo error: too much swag.'));
}
