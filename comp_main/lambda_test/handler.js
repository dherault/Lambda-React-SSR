import 'babel-polyfill'; 
import sHelpers from 'serverless-helpers-js';

sHelpers.loadEnv();

export function handler(event, context) {
  
  // Logging here
  // console.log('event', event);
  // console.log('context', context);
  
  // For dev purposes only
  console.log('in handler:', event);
  context.fail("400");
  // context.succeed(event);
}