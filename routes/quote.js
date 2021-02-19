const express = require('express')
const router = express.Router()

const quoteService = require('../services/quote.service')

router.get('/', quoteService.getQuote)

module.exports = router