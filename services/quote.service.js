const express = require('express')
const getQuoteFromDb = require('../db/dbcon')

module.exports = {
    getQuote: async (req, res) => {
        const quote = await getQuoteFromDb();
        console.log(quote)
        return res.status(200).json({quote: quote})
    }
}