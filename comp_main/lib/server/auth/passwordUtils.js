import crypto from 'crypto';
import { randomInteger } from '../../shared/utils/randomUtils';

// pbkdf2 can be accelerated with GPU, so bcrypt. But can't compile bcrypt on lambda for now, so pbkdf2.
// http://security.stackexchange.com/questions/4781/do-any-security-experts-recommend-bcrypt-for-password-storage

const len = 128; // Bytesize
const separator = '::';

function createHash(password, salt, iterations) {
  
  return new Promise((resolve, reject) => {
    
    if (typeof password !== 'string') throw new Error(`excepted password to be a string, found ${typeof password} instead`);
    if (typeof salt !== 'string') throw new Error(`excepted salt to be a string, found ${typeof salt} instead`);
    if (typeof iterations !== 'number') throw new Error(`excepted iterations to be a number, found ${typeof iterations} instead`);
    
    crypto.pbkdf2(password, salt, iterations, len, (err, derivedKey) => err ? 
      reject(err) : 
      resolve(derivedKey.toString('base64'))
    );
  });
}

export function digestPassword(password) {
  
  return new Promise((resolve, reject) => {
    
    // Salt creation
    crypto.randomBytes(len, (err, result) => {
      if (err) return reject(err);
      
      const salt = result.toString('base64');
      const iterations = randomInteger(5000, 10000); // ! very low numbers for now
      
      createHash(password, salt, iterations)
        .then(hash => resolve(`${iterations}${separator}${salt}${separator}${hash}`))
        .catch(reject);
    });
  });
}

export function validatePassword({ password, passwordDigest }) {
  
  if (typeof passwordDigest !== 'string') return Promise.reject(new Error(`excepted passwordDigest to be a string, found ${typeof passwordHash} instead`));
  
  const digestArray = passwordDigest.split(separator);
  const iterations = parseInt(digestArray[0], 10);
  const salt = digestArray[1];
  const originalHash = digestArray[2];
  
  if (typeof originalHash !== 'string') return Promise.reject(new Error(`Hash not found in passwordDigest: ${originalHash}`));
  
  return createHash(password, salt, iterations).then(hash => hash === originalHash);
}
