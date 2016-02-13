import db from './connect';
import tables from './tables';

tables.forEach(params => db.createTable(params, (err, data) => {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
}));
