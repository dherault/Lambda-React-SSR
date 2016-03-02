import AWS from 'aws-sdk';
import dynamodbConfig from '../../config/dynamodb';

const { accessKeyId, secretAccessKey, mainRegion } = dynamodbConfig;

export default new AWS.DynamoDB({
  apiVersion: '2012-08-10',
  accessKeyId,
  secretAccessKey,
  region: mainRegion,
});
