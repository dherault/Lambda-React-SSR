import db from './connect';
import tables from './tables';

tables.forEach(({ TableName }) => db.deleteTable({ TableName }, (err, data) => {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
}));
