require("dotenv").config();
const { MongoClient } = require("mongodb");
const {
  DB_NAME,
  PHRASE_COLLECTION,
} = require("./constant/databaseConstant.js");

const uri = process.env.MONGODB_URI;

async function connect() {
  try {
    const client = await MongoClient.connect(uri);
    console.log("Connected to the MongoDB server");

    // Return the MongoDB client object
    return client;
  } catch (error) {
    console.log("Failed to connect to the MongoDB server", error);
    throw error;
  }
}

async function addPhrase(phrase) {
  try {
    const client = connect();
    const db = (await client).db(DB_NAME);
    const collection = db.collection(PHRASE_COLLECTION);

    const result = await collection.insertOne(phrase);

    (await client).close;
  } catch (error) {
    console.error("addPhrase", error);
    throw error;
  }
}

async function getAllPhrases() {
  try {
    const client = connect();
    const db = (await client).db(DB_NAME);
    const collection = db.collection(PHRASE_COLLECTION);

    const data = await collection
      .find({})
      .map((phr) => {
        return {
          phrase: phr.phrase,
          meanings: phr.meanings,
        };
      })
      .toArray();

    (await client).close;

    return data;
  } catch (error) {
    console.error("getAllPhrases", error);
    throw error;
  }
}

module.exports = { addPhrase, getAllPhrases };
