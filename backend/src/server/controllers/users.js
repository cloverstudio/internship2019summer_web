const passport = require('passport');
const dbFunctions = require('../lib/dbFunctions');
const jwt = require('jsonwebtoken');
const developData = require('../config');
const express = require('express');
const router = express.Router();
const consts = require('../lib/consts');

router.post('/login', (req, res) => {
    passport.authenticate(
        'local',
        { session: false },
        (error, user, info) => {
            if (error || !user) {
                return res.json({ 'data': {
                    'error': info
                }});
            }
    
            /** JWT result (message) */
            const payload = {
                email: user.email,
                password: user.password,
                expires: Date.now() + parseInt(developData.JWT_EXPIRATION_MS),
            };
    
            /** assigns payload to req.user */
            req.login(payload, {session: false}, (error) => {
                if (error) {
                    return res.json({ error });
                }
    
                /** generate a signed json web token and return it in the response */
                const token = jwt.sign(JSON.stringify(payload), developData.JWT_SECRET);
                user.jwt = token;
                /** assign jwt to the cookie */
                res.cookie('jwt', jwt, { httpOnly: true, secure: true });
                res.json({ 'data': {
                    'user': user 
                }});
            });
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
            await dbFunctions.addTokenToResponse(response, req, res);
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
    let securityCheck = await dbFunctions.userDidNotPassSecuriityCheck(req.headers.token, res);

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
        res.json(securityCheck);
    }
});

router.get('/allUsers/:searchBy?', async (req, res) => {
    let findBy = req.params.searchBy;

    let securityCheck = await dbFunctions.userDidNotPassSecuriityCheck(req.headers.token, res);
    
    if(!securityCheck && findBy) {
        let data = await dbFunctions.findAllUsersBy(findBy);

        res.json({ data });
    }
    else if (!securityCheck && !findBy) {
        let allUsers = await dbFunctions.findAllUsers();

        res.json({ 'data': {
            'user': allUsers
        }});
    }
    else {
        res.json(securityCheck)
    }
});

router.get('/details', async (req, res) => { 
    let isLoggedIn = await dbFunctions.checkTokenAvailability(req.headers.token);

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

 module.exports = router;