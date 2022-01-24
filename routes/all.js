const express = require('express')
const router = express.Router()

const allService = require('../services/all.service')

router.get('/', allService.getAllQuotes)

module.exports = router