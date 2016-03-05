import { dbClient, tables } from '../../comp_main/lib/server/dynamodb/main';

for (let key in tables) {
  dbClient.deleteTable({ TableName: tables[key].TableName }, (err, data) => {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
}
