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
  if (!event.payload || !event.payload.query) return context.fail('BAD_REQUEST: missing query key in payload');
  
  runGraphQL(event.payload.query, event.sourceIp)
    .then(result => context.succeed(result))
    .catch(error => context.fail(error));
}
