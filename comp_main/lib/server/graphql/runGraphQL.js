import { graphql } from 'graphql';
import getSchema from './schema';
import { logFetch } from '../../shared/utils/logger';

/* Runs a GraphQL query, returns a promise */
export default function runGraphQL(query, sourceIp) {
  
  logFetch('→', query);
  
  return graphql(getSchema(sourceIp), query).then(result => {
    
    if (result.errors) {
      const n = result.errors.length;
      logFetch(`← ${n} error${n > 1 ? 's' : ''}:`);
      result.errors.forEach(err => console.log(err.stack));
    }
    else logFetch('←', result);
    
    return result;
  });
}