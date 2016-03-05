import uuid from 'uuid';

import onLambda from '../../utils/onLambda';
import { dbClient, tables } from '../main';
import { log } from '../../../shared/utils/logger';

// pbkdf2 can be accelerated with GPU, so bcrypt. 
// http://security.stackexchange.com/questions/4781/do-any-security-experts-recommend-bcrypt-for-password-storage
// Also, since bcrypt needs native compilation, I booted up a EC2 with the lambda AMI to compile it: bcrypt-lambda
const bcrypt = onLambda ? require('../../bcrypt-lambda') : require('bcrypt');

export function createUser({ username, email, password }, sourceIp) {
  
  log('createUser', username);
  
  return new Promise((resolveMain, rejectMain) => {
    
    // First we need to check if a user with the given username and email exists.
    // We are not using a scan because this method has a 1Mb data scanning limitation and is slow.
    // Instead we maintain 2 tables for those unique keys, and use a conditionnal put.
    // We could use one of those two keys as the users' table primary key, but we don't because we want an id in each model.
    // We could use global secondary indexes, but they don't support strongly consistent reads.
    // http://stackoverflow.com/questions/12920884/is-there-a-way-to-enforce-unique-constraint-on-a-property-field-other-than-the
    // http://stackoverflow.com/questions/24067283/dynamodb-checking-for-uniqueness-across-primary-key-and-another-field
    
    // Password hashing
    bcrypt.genSalt(11, (err, salt) => {
      if (err) return rejectMain(err);
      
      bcrypt.hash(password, salt, (err, passwordHash) => {
        if (err) return rejectMain(err);
        
        const id = uuid.v1(); // This is no Twitter Snowflake, but will suffice for now
        const nowString = new Date().getTime().toString(10);
        const emailVerificationToken = uuid.v4();
        
        // DB write parameters
        const emailParams = {
          TableName: tables.usersEmails.TableName,
          Item: {
            email: {
              S: email
            },
            userId: {
              S: id
            },
          },
          ConditionExpression: 'attribute_not_exists(email)', // Our custom unique constraint
        };
        const usernameParams = {
          TableName: tables.usersUsernames.TableName,
          Item: {
            username: {
              S: username
            },
            userId: {
              S: id
            },
          },
          ConditionExpression: 'attribute_not_exists(username)',
        };
        const userParams = {
          TableName: tables.users.TableName,
          Item: {
            id: {
              S: id
            },
            username: {
              S: username
            },
            email: {
              S: email
            },
            passwordHash: {
              S: passwordHash
            },
            emailVerificationToken: {
              S: emailVerificationToken
            },
            isVerified: {
              BOOL: false
            },
            createdAt: {
              N: nowString // Yes, number type is a string.
            },
            updatedAt: {
              N: nowString
            },
            creationIp: {
              S: sourceIp
            },
            updateIp: {
              S: sourceIp
            },
          },
          ConditionExpression: 'attribute_not_exists(id)',
        };
        
        let createdNewEmail = false;
        let createdNewUsername = false;
        
        // Then we write in usersEmails and usersUsernames to prevent duplicates
        const emailWritePromise = new Promise((resolve, reject) => {
          dbClient.putItem(emailParams, (err, data) => {
            if (err) {
              log('emailWritePromise rejection:', err.message);
              return reject({ source: 'emailWritePromise', error: err });
            }
            createdNewEmail = true;
            resolve();
          });
        });
        
        const usernameWritePromise = new Promise((resolve, reject) => {
          dbClient.putItem(usernameParams, (err, data) => {
            if (err) {
              log('usernameWritePromise rejection:', err.message);
              return reject({ source: 'usernameWritePromise', error: err });
            }
            createdNewUsername = true;
            resolve();
          });
        });
        
        // Finally we write in users table
        Promise.all([emailWritePromise, usernameWritePromise]).then(() => {
          
          dbClient.putItem(userParams, (err, data) => {
            if (err) {
              log('Error while creating user', err.message);
              Promise.all([deleteUserEmail(email), deleteUserUsername(username)])
                .then(() => rejectMain(err))
                .catch(() => rejectMain(err));
              return;
            }
            
            resolveMain({
              id,
              email,
              username,
              isVerified: false,
            });
            
            // todo: send verification email with SES
            
          });
        }).catch(err => { // An error is typically thrown by the unicity condition
          
          const { source, error: { code } } = err;
          const alreadyExistsCode = 'ConditionalCheckFailedException';
          let conflictErrorMessage;
          let whatToDo = Promise.resolve();
          
          // If email already exists, we delete the username to make it available again
          if (source === 'emailWritePromise') {
            if (code === alreadyExistsCode) conflictErrorMessage = 'Email already exists';
            if (createdNewUsername) whatToDo = deleteUserUsername(username);
          }
          
          // If username already exists, we delete the email to make it available again
          else if (source === 'usernameWritePromise') {
            if (code === alreadyExistsCode) conflictErrorMessage = 'Username already exists';
            if (createdNewEmail) whatToDo = deleteUserEmail(email);
          }
          
          whatToDo
            .then(() => rejectMain(conflictErrorMessage ? new Error('CONFLICT: ' + conflictErrorMessage) : err.error))
            .catch(rejectMain); // Too many errors :)
        });
      });
    });
  });
}

/* Deletes an entry in usersEmails if it exists */
function deleteUserEmail(email) {
  
  log('deleting user email:', email);
  
  return new Promise((resolve, reject) => {
    dbClient.deleteItem({
      TableName: tables.usersEmails.TableName,
      Key: {
        email: {
          S: email
        }
      }
    }, (err, data) => err ? reject(err) : resolve(true));
  });
}

/* Deletes an entry in usersUsernames if it exists */
function deleteUserUsername(username) {
  
  log('deleting user username:', username);
  
  return new Promise((resolve, reject) => {
    dbClient.deleteItem({
      TableName: tables.usersUsernames.TableName,
      Key: {
        username: {
          S: username
        }
      }
    }, (err, data) => err ? reject(err) : resolve(true));
  });
}
