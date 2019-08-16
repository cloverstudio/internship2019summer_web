const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/requests', require('./requests'));

module.exports = router;