import 'babel-polyfill'; 
import sHelpers from 'serverless-helpers-js';
// import onLambda from '../lib/server/utils/onLambda';

sHelpers.loadEnv();

export function handler(event, context) {
  
  // Logging here
  // console.log('event', event);
  // console.log('context', context);
  
  // const error = new Error('yolo');
  // error.code = 404;
  // context.fail(error); 
  
  // const htmlSuccess = '<!DOCTYPE html><html><body>Success!</body></html>';
  // const htmlFailure = '<!DOCTYPE html><!-- 404 --><html><body>This is 404</body></html>';
  console.log('in handler:', event);
  context.succeed(event);
}