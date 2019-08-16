const passport = require('passport');
const dbFunctions = require('../lib/dbFunctions');
const jwt = require('jsonwebtoken');
const developData = require('../config');
const express = require('express');
const router = express.Router();
const consts = require('../lib/consts');
const jwt_decode = require('jwt-decode');
const upload = require('../middlewares/multer');
const tokenFunctions = require('../lib/tokenFunctions');

router.post('/login', async (req, res) => {
    passport.authenticate(
        'local',
        { session: false },
        async (error, user, info) => {
            if (error || !user) {
                return res.json({ 'data': {
                    'error': info
                }});
            }
    
            await tokenFunctions.addTokenToResponse(user ,req, res);
            return res.json({ 'data': {
                'user': user 
            }});
        },
      )(req, res);
 });

router.post('/register', async (req, res) => {
    let user = req.body;
    let response = await dbFunctions.insertNewUser(user.firstName, user.lastName, user.email, user.oib, user.password)
    try{
        if (response.error) {
            res.json({ 'data': response
        })} else {
            await tokenFunctions.addTokenToResponse(response, req, res);
            res.json({ 'data': {
                'user': response
            }});
        } 
    } catch (err) {
        console.log(err);
    }       
 });

 router.post('/newUser', async (req, res) => {
    let user = req.body;

    let data = await dbFunctions.insertNewUser(user.firstName, user.lastName, user.email, user.oib, user.password);
    let securityCheck = await tokenFunctions.userDidNotPassSecuriityCheck(req.headers.token, res);

    // if email/oib are taken
    if (!securityCheck && data.error) {
        res.json({
            'data': data
        });
    }
    else if (!securityCheck) {
        res.json({ 'data': {
            'user': data
        }});
    } else {
        res.send(440).json(securityCheck);
    }
});

router.get('/allUsers/:searchBy?', async (req, res) => {
    let findBy = req.params.searchBy;
    let securityCheck = await tokenFunctions.userDidNotPassSecuriityCheck(req.headers.token, res);
    
    if(!securityCheck && findBy) {
        let user = await dbFunctions.findAllUsersBy(findBy);

        return res.json({ 'data': {
            'user': user
        }});
    }
    else if (!securityCheck && !findBy) {
        let allUsers = await dbFunctions.findAllUsers();

        return res.json({ 'data': {
            'user': allUsers
        }});
    }
    else {
        res.send(440).json(securityCheck)
    }
});

router.get('/details', async (req, res) => { 
    let isLoggedIn = await tokenFunctions.checkTokenAvailability(req.headers.token);

    let user = await dbFunctions.findAllUsersById(req.body.id);

    if (user.length > 0 && isLoggedIn) {
        res.json({ 'data': {
            'user': {
                'firstName': user[0].firstName,
                'lastName': user[0].lastName,
                'oib': user[0].oib,
                'email': user[0].email
            }
        }})
    } else if (isLoggedIn && user.length == 0){
        res.json({ 'data': {
            'error': {
                'error_code': consts.responseErrorUserDetailUnknownId.error_code,
                'error_description': consts.responseErrorUserDetailUnknownId.error_description,
            }
        }})
    } else {
        res.json({ 'data': {
            'error': {
                'error_code': consts.responseErrorExpiredToken.error_code,
                'error_description': consts.responseErrorExpiredToken.error_description,
            }
        }})
    }
})

router.post('/logout', (req, res) => {
    let token = req.headers.token;
    jwt_decode(token).expires = null;
})

router.put('/newUser', upload.single('photo'), async (req, res) => {
    let user = req.body;
    let securityCheck = await tokenFunctions.userDidNotPassSecuriityCheck(req.headers.token, res);
    let data = await dbFunctions.updateUser(user.firstName, user.lastName, user.email, user.oib, user.password, req.file.filename, user.id);

    if (!securityCheck && data.error) {
        res.json({
            'data': data
        });
    }
    else if (!securityCheck) {
        res.json({ 'data': {
            'user': data
        }});
    } else {
        res.send(440).json(securityCheck);
    }
})

module.exports = router;