require('dotenv').config()
const {MongoClient} = require('mongodb');
const seedrandom = require("seedrandom")

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
        console.error(e);
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
        console.error(e);
    }
}

const getDailySeed = function() {
    const date = new Date()
    const seed = '' + date.getDate() + '' + date.getMonth() + '' + date.getFullYear()
    const rng = seedrandom(seed)
    return rng()
}

const getRandomIndex = function(length, rnd) {
    return parseInt(length * rnd);
}

module.exports = {
    getQuoteFromDb: getQuoteFromDb,
    getDailyQuote: getDailyQuote
};
