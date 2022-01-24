const express = require('express')
const router = express.Router()

const dailyService = require('../services/daily.service')

router.get('/', dailyService.dailyQuote);

module.exports = router