import dotenv from 'dotenv';

// Load credentials from file (THIS IS BAD!!!)
dotenv.config({ path: 'dynamodb.env' });

const { DYNAMODB_ADMIN_AWS_ACCESS_KEY_ID, DYNAMODB_ADMIN_AWS_SECRET_ACCESS_KEY } = process.env;

if (!DYNAMODB_ADMIN_AWS_ACCESS_KEY_ID || !DYNAMODB_ADMIN_AWS_SECRET_ACCESS_KEY) {
  console.log('Error: env variables not found!');
  process.exit(0);
}

const config = {
  accessKeyId: DYNAMODB_ADMIN_AWS_ACCESS_KEY_ID,
  secretAccessKey: DYNAMODB_ADMIN_AWS_SECRET_ACCESS_KEY,
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

// Don't know ow to handle multiple regions yet
config.mainRegion = config.regions[0];

export default config;