const db = require('../db/dbcon')

module.exports = {
    getAllQuotes: async (req, res) => {
        const quotes = await db.getAllQuotes();
        return res.status(200).json({quotes: quotes})
    }
}