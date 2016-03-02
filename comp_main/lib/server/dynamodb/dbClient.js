import AWS from 'aws-sdk';
import dynamodbConfig from '../../../../config/dynamodb';

const { accessKeyId, secretAccessKey, mainRegion } = dynamodbConfig;

// Not very DRY: scripts/dynamodb/connect.js does the same thing
export default new AWS.DynamoDB({
  apiVersion: '2012-08-10',
  accessKeyId,
  secretAccessKey,
  region: mainRegion,
});
