import dynamodbConfig from '../../../../config/dynamodb';

export default dynamodbConfig.getTables({
  stage: 'dev' // todo: replace with process.env when configured
});
