import db from './connect';
import dynamodbConfig from '../../config/dynamodb';

const tables = dynamodbConfig.getTables({
  stage: 'dev',
});

for (let key in tables) {
  db.createTable(tables[key], (err, data) => {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
}
