import crypto from 'crypto';

const generateRandomString = (length: number = 0) => {
    return crypto.randomBytes(Math.ceil(length / 2))
                             .toString('hex') 
                             .slice(0, length);
};

const jwtSecret = generateRandomString(32); 
console.log(jwtSecret);
