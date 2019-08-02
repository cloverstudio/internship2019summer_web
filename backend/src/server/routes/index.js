const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index');

router.post('/login', controllers.authenticateUser);

router.post('/register', controllers.register);

module.exports = router;