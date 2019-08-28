const express = require('express');
const router = express.Router();
const dbFunctions = require('../lib/dbFunctions');
const jwt_decode = require('jwt-decode');
const tokenFunctions = require('../lib/tokenFunctions');
const upload = require('../middlewares/multer');
const fileUploadFunctions = require('../lib/fileUploadFunctions');
const consts = require('../lib/consts');

router.post('/new', upload.any(), async (req,res) => {
    let token = req.headers.token;
    let securityCheck = await tokenFunctions.userDidNotPassSecuriityCheck(token, res);
    let userId = await dbFunctions.findUserID(jwt_decode(token).email);
    let fileName = undefined;
    let imageName = undefined;
    
    let getFileNames = fileUploadFunctions.allFilesCheck(req.files);

    if (getFileNames.images) { //save all images into imageName
        imageName = JSON.stringify(getFileNames.images )
    }
    if (getFileNames.files) { ///save all other files into fileName
        fileName = JSON.stringify(getFileNames.files)
    }

    if (!securityCheck) { 
        await dbFunctions.addNews(req.body, imageName, fileName, userId);
        res.json({ 'data': {
            'message': 'added news!'
        }});
    } else {
        res.status(440).json(securityCheck);
    }

})

router.put('/edit/:id', upload.any(), async (req,res) => {
    let data = req.body;
    let token = req.headers.token;
    let securityCheck = await tokenFunctions.userDidNotPassSecuriityCheck(token, res);
    let fileName = undefined;
    let imageName = undefined;
    let newsID = req.params.id;

    let getFileNames = fileUploadFunctions.allFilesCheck(req.files);

    if (getFileNames.images) { //save all images into imageName
        imageName = JSON.stringify(getFileNames.images )
    }
    if (getFileNames.files) { //save all other files into fileName
        fileName = JSON.stringify(getFileNames.files)
    }

    if (!securityCheck) {
        await dbFunctions.updateNews(data, imageName, fileName, newsID)

        res.json({ 'data': {
            'message': 'news updated!'
        }});

    } else {
        res.status(440).json(securityCheck);
    }
    
})

router.get('/all', async (req, res) => {
    let token = req.headers.token;
    let isLoggedIn = tokenFunctions.checkTokenAvailability(token);

    if (isLoggedIn) {
        let data = await dbFunctions.getAllNews();
        res.json({ 'data': {
            'news': data
        }})
    } else {
        res.status(440).json({ 'data': {
            'error': {
                'error_code': consts.responseErrorExpiredToken.error_code,
                'error_description': consts.responseErrorExpiredToken.error_description
            }
        }});
    }
})

module.exports = router;