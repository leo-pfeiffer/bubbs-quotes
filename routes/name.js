const express = require('express')
const router = express.Router()

const nameService = require('../services/name.service')

router.get('/', nameService.dailyName);

module.exports = router