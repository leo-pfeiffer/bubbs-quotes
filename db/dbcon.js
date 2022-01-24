require('dotenv').config()
const {MongoClient, ObjectID} = require('mongodb');
const {getRandomIndex, getDailySeed} = require('../utils/utils')

const database = process.env.DATABASE;
const user = process.env.DBUSER;
const password = process.env.DBPASSWORD;

const uri = `mongodb+srv://${user}:${password}@playground.eqgtb.mongodb.net/${database}?retryWrites=true&w=majority&`;

const getQuoteFromDb = async function() {
    try {
        // Connect to the MongoDB cluster
        const client = new MongoClient(uri, {useUnifiedTopology: true});
        await client.connect();

        const collection = client.db(database).collection("quotes");
        const cursor = collection.aggregate([{ $sample: { size: 1 } }])
        const res = await cursor.toArray();

        return res[0]

    } catch (e) {
        console.log(e);
    }
}

const getDailyQuote = async function() {
    try {
        // Connect to the MongoDB cluster
        const client = new MongoClient(uri, {useUnifiedTopology: true});
        await client.connect();

        const collection = client.db(database).collection("quotes");

        const cursor = collection.find({}, {_id:1}).map(x => x._id);

        // const cursor = collection.aggregate([{ $sample: { size: 1 } }])
        const res = await cursor.toArray();

        const seed = getDailySeed();
        const idx = getRandomIndex(res.length, seed);

        return await collection.findOne({_id: res[idx]});

    } catch (e) {
        console.log(e);
    }
}

const getAllQuotes = async function() {
    const client = new MongoClient(uri, {useUnifiedTopology: true});
    await client.connect();
    const collection = client.db(database).collection("quotes");
    const cursor = collection.find({}, {_id:1}).map(x => {return {_id: x._id, quote: x.quote}});
    return await cursor.toArray();

}

const insertNewQuote = async function(quote) {
    try {
        // Connect to the MongoDB cluster
        const client = new MongoClient(uri, {useUnifiedTopology: true});
        await client.connect();
        const collection = client.db(database).collection("quotes");
        await collection.insertOne(quote);
    } catch (e) {
        console.log(e);
    }
}

const deleteQuote = async function(quote) {

    try {
        // Connect to the MongoDB cluster
        const client = new MongoClient(uri, {useUnifiedTopology: true});
        await client.connect();
        const collection = client.db(database).collection("quotes");
        await collection.deleteOne({_id: new ObjectID(quote)});
    } catch (e) {
        console.log(e);
    }

}



module.exports = {
    getQuoteFromDb: getQuoteFromDb,
    getDailyQuote: getDailyQuote,
    insertNewQuote: insertNewQuote,
    getAllQuotes: getAllQuotes,
    deleteQuote: deleteQuote
};
