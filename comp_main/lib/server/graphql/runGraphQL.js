import { graphql } from 'graphql';
import schema from './schema';
import { logFetch } from '../../shared/utils/logger';

/* Runs a GraphQL query, returns a promise */
export default function runGraphQL(query, sourceIp) {
  
  logFetch('→', query);
  
  return graphql(schema, query, { sourceIp }).then(({ errors, data }) => {
    
    // On error, we must throw (--> context.fail --> APIG reply with statusCode !== 200) 
    if (errors) {
      const n = errors.length;
      let whatToThrow; // We can throw only one error, but we can log all of them
      
      logFetch(`← ${n} error${n > 1 ? 's' : ''}:`);
      
      errors.forEach(({ originalError, message, stack }) => {
        
        // It's a graphQL related error (400: syntax, ...)
        if (!originalError) { 
          console.log(stack);
          if (!whatToThrow) {
            whatToThrow = new Error('BAD_REQUEST: ' + message);
            whatToThrow.stack = stack;
          }
          
        // It's not a graphQL related error (404, 409, 500)
        } else { 
          const { message } = originalError;
          
          if (message.match(/^(NOT_FOUND|CONFLICT).*/)) {
            console.log(message);
            whatToThrow = message;
            
          } else {
            console.log(stack);
            whatToThrow = 'BAD_IMPLEMENTATION: Internal server error';
          }
        }
      });
      
      throw whatToThrow;
      
    // No error, no problem
    } else {
      logFetch('←', data);
      
      return data;
    }
  }); // Can graphql reject ? Bad docs...
}