import dotenv from 'dotenv';
import AWS from 'aws-sdk';

dotenv.config({
  path: 'dynamodb.env'
});

const { DYNAMODB_ADMIN_AWS_ACCESS_KEY_ID, DYNAMODB_ADMIN_AWS_SECRET_ACCESS_KEY, DYNAMODB_REGION } = process.env;

if (!DYNAMODB_ADMIN_AWS_ACCESS_KEY_ID || !DYNAMODB_ADMIN_AWS_SECRET_ACCESS_KEY || !DYNAMODB_REGION) {
  console.log('Error: env variables not found!');
  process.exit(1);
}

export default new AWS.DynamoDB({
  apiVersion: '2012-08-10',
  accessKeyId: DYNAMODB_ADMIN_AWS_ACCESS_KEY_ID,
  secretAccessKey: DYNAMODB_ADMIN_AWS_SECRET_ACCESS_KEY,
  region: DYNAMODB_REGION,
});
