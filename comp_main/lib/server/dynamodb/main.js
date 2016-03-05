import onLambda from '../utils/onLambda';
import AWS from 'aws-sdk';

/* This file could be splitted, but is not for dev convenience */

const config = {
  regions: ['eu-west-1'],
  
  // http://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_CreateTable.html
  getTables: ({ stage }) => {
    const createName = model => `aquest-${stage}-${model}`;
    
    return {
      
      /* USERS */
      users: {
        TableName: createName('users'),
        AttributeDefinitions: [
          {
            AttributeName: 'id',
            AttributeType: 'S',
          }
        ],
        KeySchema: [
          {
            AttributeName: 'id',
            KeyType: 'HASH'
          }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 1, // !
          WriteCapacityUnits: 1 // !
        },
      },
      
      /* USERS EMAIL */
      // To ensure email uniqueness, this spares a 'Scan' on users table and thus is faster/cheaper
      // http://stackoverflow.com/questions/12920884/is-there-a-way-to-enforce-unique-constraint-on-a-property-field-other-than-the
      // http://stackoverflow.com/questions/24067283/dynamodb-checking-for-uniqueness-across-primary-key-and-another-field
      usersEmails: {
        TableName: createName('users-emails'),
        AttributeDefinitions: [
          {
            AttributeName: 'email',
            AttributeType: 'S',
          }
        ],
        KeySchema: [
          {
            AttributeName: 'email',
            KeyType: 'HASH'
          }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 1, // !
          WriteCapacityUnits: 1 // !
        },
      },
      
      /* USERS USERNAME */
      // To ensure username uniqueness, this spares a 'Scan' on users table and thus is faster/cheaper
      usersUsernames: {
        TableName: createName('users-usernames'),
        AttributeDefinitions: [
          {
            AttributeName: 'username',
            AttributeType: 'S',
          }
        ],
        KeySchema: [
          {
            AttributeName: 'username',
            KeyType: 'HASH'
          }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 1, // !
          WriteCapacityUnits: 1 // !
        },
      },
    };
  }
};

// Don't know how to handle multiple regions yet
config.mainRegion = config.regions[0];

// Options to create db client
const clientOptions = {
  apiVersion: '2012-08-10',
  region: config.mainRegion,
};

// Lambdas accessing the database should have the proper IAM to operate with DynamoDb
// For local dev, we load the credential from a file:
if (!onLambda) {
  require('dotenv').config({ path: 'dynamodb.env' });
  
  const { DYNAMODB_ADMIN_AWS_ACCESS_KEY_ID, DYNAMODB_ADMIN_AWS_SECRET_ACCESS_KEY } = process.env;
  
  if (!DYNAMODB_ADMIN_AWS_ACCESS_KEY_ID || !DYNAMODB_ADMIN_AWS_SECRET_ACCESS_KEY) {
    console.log('Error: dynamodb.env variables not found!');
    process.exit(0);
  }
  
  clientOptions.accessKeyId = DYNAMODB_ADMIN_AWS_ACCESS_KEY_ID;
  clientOptions.secretAccessKey = DYNAMODB_ADMIN_AWS_SECRET_ACCESS_KEY;
}

const dbClient = new AWS.DynamoDB(clientOptions);

const tables = config.getTables({
  stage: 'dev' // todo: replace with process.env when configured
});

console.log(process.env);

export { config, dbClient, tables };
