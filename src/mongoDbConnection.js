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
    //Get Connected MongoDB Client
    const client = connect();

    //Access the spesific database
    const db = (await client).db(DB_NAME);

    //Access the spesific collection where we want to add the phrase
    const collection = db.collection(PHRASE_COLLECTION);

    //Insert the phrase into the collection
    const result = await collection.insertOne(phrase);
    console.log("Phrase added:", result.insertedId);

    //Close the connection
    (await client).close;
  } catch (error) {
    console.error("Error adding entity:", error);
    throw error;
  }
}

module.exports = { addPhrase };
