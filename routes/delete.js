const express = require('express')
const router = express.Router()

const deleteService = require('../services/delete.service')

router.get('/', deleteService.serveDelete);

router.post('/', deleteService.deleteQuote)

module.exports = router