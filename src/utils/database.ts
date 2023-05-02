const { MongoClient } = require("mongodb");

// Config
const { mongo } = require("../config");

// Mongo
export const client = new MongoClient(mongo.uri, { useNewUrlParser: true });

export async function connect(): Promise<void> {
  try {
    await client.connect();
    console.log('🌲 [mongodb]: Connected successfully to database');
    return client;
  } catch (err) {
    console.log('👀 [mongodb]: Unable to connect to MongoDB');
    process.exit(1);
  }
};

export async function close(): Promise<void> {
  try {
    await client.close();
    console.log('🔌 [mongodb]: Disconnected from MongoDB!');
  } catch (err) {
    console.log(`⚠️ [mongodb]: Error disconnecting from MongoDB: ${err}`);
  }
};

connect().then().catch(console.error);
