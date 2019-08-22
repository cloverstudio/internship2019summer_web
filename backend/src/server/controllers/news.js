const express = require('express');
const router = express.Router();
const dbFunctions = require('../lib/dbFunctions');
const jwt_decode = require('jwt-decode');
const tokenFunctions = require('../lib/tokenFunctions');
const consts = require('../lib/consts');
const upload = require('../middlewares/multer');
const fileUploadFunctions = require('../lib/fileUploadFunctions');

router.post('/new', upload.any(), async (req,res) => {
    let token = req.headers.token;
    let securityCheck = await tokenFunctions.userDidNotPassSecuriityCheck(token, res);
    let userId = await dbFunctions.findUserID(jwt_decode(token).email);
    let fileName = undefined;
    let imageName = undefined;
    let getFileNames = fileUploadFunctions.allFilesCheck(req.files);

    if (getFileNames.images) {
        imageName = JSON.stringify(getFileNames.images )
    }
    if (getFileNames.files) {
        fileName = JSON.stringify(getFileNames.files)
    }
    if (!securityCheck) {
        await dbFunctions.addNews(req.body, imageName, fileName, userId);
        res.json({ 'data': {
            'messagge': 'added news!'
        }});
    } else {
        res.status(440).json(securityCheck);
    }

})

module.exports = router;