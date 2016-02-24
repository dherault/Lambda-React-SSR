import { graphql } from 'graphql';
import Schema from './schema';
import { logFetch } from '../shared/utils/logger';

export default function runGraphQL(query) {
  
  logFetch('→', query);
  
  return graphql(Schema, query).then(result => {
    
    logFetch('←', result);
    if (result.errors) console.log(result.errors[0].stack);
    
    return result;
  });
}