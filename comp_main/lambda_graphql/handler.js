import 'babel-polyfill'; 
import sHelpers from 'serverless-helpers-js';
import onLambda from '../lib/server/utils/onLambda';
import runGraphQL from '../lib/server/runGraphQL';

sHelpers.loadEnv();

export function handler(event, context) {
  
  // Logging here
  // console.log('event', event);
  // console.log('context', context);
  
  // const userId = null;
  const query = event.payload;
  console.log(query);
  
  runGraphQL(query)
    .then(result => context.succeed(result))
    .catch(result => context.fail(result))
  // context.fail(new Error('Yolo error: too much swag.'));
  // context.fail(new Error('400 oh no!'));
  // context.succeed({ query: query || 'nothing' });
}
