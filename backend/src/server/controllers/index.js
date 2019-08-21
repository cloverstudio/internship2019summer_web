const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/requests', require('./requests'));
router.use('/news', require('./news'));

module.exports = router;