const { Pool } = require('pg');

const PG_URI =
'postgres://cyuukbll:piqPNFcMo8E0-s5qoM2Htvy7F-kiASvL@lallah.db.elephantsql.com:5432/cyuukbll';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('Query: ', text);
    return pool.query(text, params, callback);
  },
}