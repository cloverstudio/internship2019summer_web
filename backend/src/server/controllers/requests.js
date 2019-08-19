const express = require('express');
const router = express.Router();
const dbFunction = require('../lib/dbFunctions');
const jwt_decode = require('jwt-decode');
const tokenFunction = require('../lib/tokenFunctions');
const consts = require('../lib/consts');
const upload = require('../middlewares/multer');

router.post('/new', upload.single('photo'), async (req, res) => {
    let data = req.body;
    let isLoggedIn = await tokenFunction.checkTokenAvailability(req.headers.token);
    let file = req.file || undefined;
    let imagePath = undefined;

    if (file) {
        imagePath = `uploads/photos/${file.filename}`;
    }

    if(!isLoggedIn) {
        res.status(440).json({ 'data': {
            'error': {
                'error_code': consts.responseErrorExpiredToken.error_code,
                'error_description': consts.responseErrorExpiredToken.error_description
            }
        }})
    } else {
        let userId = await dbFunction.findUserID(jwt_decode(req.headers.token).email);
        dbFunction.newRequest(data, userId, imagePath);
        res.status(200).json('ok!');
    }

})

module.exports = router;

