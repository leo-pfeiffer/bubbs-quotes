const express = require('express')
const router = express.Router()

const addService = require('../services/add.service')

router.get('/', addService.serveAdd);

router.post('/', addService.postNewQuote)

module.exports = router