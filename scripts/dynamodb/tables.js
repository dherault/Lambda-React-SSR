export default [
  {
    TableName: `${process.env.DYNAMODB_TABLE_PREFIX}-users`,
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
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    },
  }
];
