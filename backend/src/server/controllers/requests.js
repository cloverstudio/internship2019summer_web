const express = require('express');
const router = express.Router();
const dbFunction = require('../lib/dbFunctions');
const jwt_decode = require('jwt-decode');
const tokenFunction = require('../lib/tokenFunctions');

router.post('/new', async (req, res) => {
    let data = req.body;

    let isLoggedIn = await tokenFunction.checkTokenAvailability(req.headers.authorization.split(" ")[1]);
    let userId = await dbFunction.findUserID(jwt_decode(req.headers.authorization.split(" ")[1]).email);

    dbFunction.newRequest(data.title, data.Request_type, data.location_latitude, data.location_longitude, data.message, userId);

    res.status(200).json('ok!');

})

module.exports = router;

