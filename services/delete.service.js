const db = require('../db/dbcon')
const path = require('path');

module.exports = {
    serveDelete: async (req, res) => {
        return res.sendFile(path.join(__dirname, '../content', 'delete.html'));
    },

    deleteQuote: async (req, res) => {
        const quote = req.body.quote
        if (quote !== undefined && quote !== '') {
            await db.deleteQuote(quote);
        }
        return res.sendFile(path.join(__dirname, '../content', 'delete.html'));
    }
}
