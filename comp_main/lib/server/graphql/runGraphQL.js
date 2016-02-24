import { graphql } from 'graphql';
import Schema from './schema';
import { logFetch } from '../../shared/utils/logger';

export default function runGraphQL(query) {
  
  logFetch('→', query);
  
  return graphql(Schema, query).then(result => {
    
    if (result.errors) {
      const n = result.errors.length;
      logFetch(`← ${n} error${n > 1 ? 's' : ''}:`);
      result.errors.forEach(err => console.log(err.stack));
    }
    else logFetch('←', result);
    
    return result;
  });
}