const express = require('express');
const router = express.Router();
const dbFunction = require('../lib/dbFunctions');
const jwt_decode = require('jwt-decode');
const tokenFunction = require('../lib/tokenFunctions');
const consts = require('../lib/consts');
const upload = require('../middlewares/multer');
const fileUploadFunctions = require('../lib/fileUploadFunctions');

router.post('/new', upload.single('photo'), async (req, res) => {
    let data = req.body;
    let isLoggedIn = await tokenFunction.checkTokenAvailability(req.headers.token);
    let imagePath = fileUploadFunctions.checkImageUpload(req.file);

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
        res.status(200).json({'data': {
            'message': 'add new request!'
        }});
    }

})

router.put('/edit/:id', upload.single('photo'), async (req,res) => {
    let isLoggedIn = await tokenFunction.checkTokenAvailability(req.headers.token);
    let data = req.body;
    let imagePath = fileUploadFunctions.checkImageUpload(req.file);
    let id = req.params.id;

    if(!isLoggedIn) {
        res.status(440).json({ 'data': {
            'error': {
                'error_code': consts.responseErrorExpiredToken.error_code,
                'error_description': consts.responseErrorExpiredToken.error_description
            }
        }})
    } else {
        await dbFunction.updateRequest(data, imagePath, id);
        res.json({'data': {
            'message': 'request updated!'
        }});
    }
})

router.get('/myRequests', async (req,res) => {
    let token = req.headers.token
    let userId = await dbFunction.findUserID(jwt_decode(token).email);
    let isLoggedIn = await tokenFunction.checkTokenAvailability(token);
    let searchTerm = req.body.findBy || undefined;
    if(!isLoggedIn) {
        res.status(440).json({ 'data': {
            'error': {
                'error_code': consts.responseErrorExpiredToken.error_code,
                'error_description': consts.responseErrorExpiredToken.error_description
            }
        }})
    } else if (searchTerm){
        let myRequests = await dbFunction.findAllRequestsMadeByWithSearchTerm(userId, searchTerm);
        res.json({ 'data': {
            'requests': myRequests
        }});
    } else {
        let myRequests = await dbFunction.findAllRequestsMadeBy(userId);
        res.json({ 'data': {
            'requests': myRequests
        }});
    }
})

router.get('/all', async (req,res) => {
    let token = req.headers.token;
    let securityCheck = await tokenFunction.userDidNotPassSecuriityCheck(token, res);
    let search = req.body.findBy || undefined;

    if (!securityCheck && findBy) {
        let allSortedRequests = await dbFunction.findAllRequestsSortedByRequestType(search);
        res.json({ 'data': {
            'requests': allSortedRequests
        }})
    }
    else if (!securityCheck) {
        let allRequests = await dbFunction.getAllRequests();
        res.json({ 'data': {
            'requests': allRequests
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

