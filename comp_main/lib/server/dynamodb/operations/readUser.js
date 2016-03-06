import { dbClient, tables } from '../main';
import deserialize from '../helpers/deserialize';
import { log } from '../../../shared/utils/logger';

/* Read user (by id) */
export default function readUser(id, ProjectionExpression) {
  
  log('readUser', id);
  
  return new Promise((resolve, reject) => {
    
    // DB read parameters
    const params = {
      ProjectionExpression,
      TableName: tables.users.TableName,
      Key: {
        id: {
          S: id
        }
      },
    };
    
    dbClient.getItem(params, (err, data) => {
      if (err) return reject(err);
      
      const user = data.Item;
      
      if (!user) return reject(new Error('NOT_FOUND: User not found'));
      
      resolve(deserialize(user));
    });
  });
}