import crypto from 'crypto';

// pbkdf2 can be accelerated with GPU, so bcrypt. But can't compile bcrypt on lambda for now, so pbkdf2.
// http://security.stackexchange.com/questions/4781/do-any-security-experts-recommend-bcrypt-for-password-storage

const len = 128; // Bytesize
const passwordHashSeparator = ':::';

function createSalt() {
  
  return new Promise((resolve, reject) => {
    
    crypto.randomBytes(len, (err, result) => err ? reject(err) : resolve(result.toString('base64')));
  });
}

export function hashPassword(password, salt) {
  
  return new Promise((resolve, reject) => {
    
    const saltPromise = typeof salt === 'string' ? Promise.resolve(salt) : createSalt();
    
    saltPromise.then(salt => {
      const iterations = 4096;
      
      crypto.pbkdf2(password, salt, iterations, len, (err, derivedKey) => {
				if (err) return reject(err);
				resolve(salt + passwordHashSeparator + derivedKey.toString('base64'));
			});
    }).catch(reject);
  });
}

export function validatePassword({ password, passwordHash }) {
  
  const salt = passwordHash.split(passwordHashSeparator)[0];
  
  if (typeof salt !== 'string') return Promise.reject(new Error('Salt not found in passwordHash'));
  
  return hashPassword(password, salt).then(newPasswordHash => newPasswordHash === passwordHash);
}