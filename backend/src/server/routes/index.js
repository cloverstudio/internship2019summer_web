const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index');

router.use('/', controllers);

module.exports = router;