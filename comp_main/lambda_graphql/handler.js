import 'babel-polyfill'; 
import sHelpers from 'serverless-helpers-js';
// import onLambda from '../lib/server/utils/onLambda';
import runGraphQL from '../lib/server/graphql/runGraphQL';

sHelpers.loadEnv();

export function handler(event, context) {
  
  // Logging here
  // console.log('event', event);
  // console.log('context', context);
  
  // Is it 400 or 422 ?
  if (!event.payload || !event.payload.query) return context.fail('BAD REQUEST: missing query key in payload');
  
  runGraphQL(event.payload.query)
    .then(result => context.succeed(result))
    .catch(result => context.fail(result));
}
