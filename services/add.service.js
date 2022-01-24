const db = require('../db/dbcon')
const path = require('path');

module.exports = {
    serveAdd: async (req, res) => {
        return res.sendFile(path.join(__dirname, '../content', 'add.html'));
    },

    postNewQuote: async (req, res) => {
        const quote_raw = req.body.quote;
        const quote = {quote: quote_raw}
        if (quote_raw !== undefined && quote_raw !== '') {
            await db.insertNewQuote(quote);
        }
        return res.sendFile(path.join(__dirname, '../content', 'add.html'));
    }
}
