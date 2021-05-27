const { MongoClient } = require('mongodb');

let database = null;

async function connect() {
  try {
    // const uri = 'mongodb://localhost:27017'
    const uri =
      'mongodb+srv://admin:admin@cluster0.3io2u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    await client.connect();

    const db = await client.db('EntertainMe');
    database = db;
    return database;
  } catch (error) {
    console.log(error);
  }
}

// biar ngga return null
function getDatabase() {
  return database;
}

module.exports = { connect, getDatabase };
