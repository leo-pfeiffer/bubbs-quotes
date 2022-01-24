const express = require('express')
const db = require('../db/dbcon')

module.exports = {
    getQuote: async (req, res) => {
        const quote = await db.getQuoteFromDb();
        return res.status(200).json({quote: quote})
    }
}