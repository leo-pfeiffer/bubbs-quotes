const express = require('express')
const db = require('../db/dbcon')

module.exports = {
    dailyQuote: async (req, res) => {
        const quote = await db.getDailyQuote();
        return res.status(200).json({quote: quote})
    }
}
