import dbClient from '../dbClient';
import tables from '../tables';
import deserialize from '../helpers/deserialize';
import { log } from '../../../shared/utils/logger';

export function readUserByEmailOrUsername(emailOrUsername) {
  
  log('readUserByEmailOrUsername', emailOrUsername);
  
  return new Promise((resolve, reject) => {
    
    // DB read parameters
    const emailParams = {
      TableName: tables.usersEmails.TableName,
      Key: {
        email: {
          S: emailOrUsername
        }
      },
    };
    const usernameParams = {
      TableName: tables.usersUsernames.TableName,
      Key: {
        username: {
          S: emailOrUsername
        }
      },
    };
    
    const readEmailPromise = new Promise((resolve, reject) => {
      dbClient.getItem(emailParams, (err, data) => err ? reject(err) : resolve(data.Item || {}));
    });
    
    const readUsernamePromise = new Promise((resolve, reject) => {
      dbClient.getItem(usernameParams, (err, data) => err ? reject(err) : resolve(data.Item || {}));
    });
    
    Promise.all([readEmailPromise, readUsernamePromise]).then(([emailData, usernameData]) => {
      
      // console.log(emailData, usernameData);
      // Shape of data: { username: { S: 'coco' }, userId: { S: '1234' } }
      const userId = emailData.userId || usernameData.userId || null;
      
      if (!userId) return reject(new Error('NOT_FOUND: User not found'));
      
      const userParams = {
        TableName: tables.users.TableName,
        Key: {
          id: userId
        },
        ProjectionExpression: 'id, email, username, passwordHash, isVerified',
      };
      
      dbClient.getItem(userParams, (err, data) => err ? reject(err) : resolve(deserialize(data.Item)));
    }).catch(err => reject(err));
  });
}
