const express = require('express');
const router = express.Router();
const dbFunction = require('../lib/dbFunctions');
const jwt_decode = require('jwt-decode');
const tokenFunction = require('../lib/tokenFunctions');
const consts = require('../lib/consts');

router.post('/new', async (req, res) => {
    let data = req.body;

    let isLoggedIn = await tokenFunction.checkTokenAvailability(req.headers.token);
    let userId = await dbFunction.findUserID(jwt_decode(req.headers.token).email);

    if(!isLoggedIn) {
        res.status(440).json({ 'data': {
            'error': {
                'error_code': consts.responseErrorExpiredToken.error_code,
                'error_description': consts.responseErrorExpiredToken.error_description
            }
        }})
    }
    dbFunction.newRequest(data.title, data.Request_type, data.location_latitude, data.location_longitude, data.message, userId);

    res.status(200).json('ok!');

})

module.exports = router;

