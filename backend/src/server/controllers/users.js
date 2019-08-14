const passport = require('passport');
const dbFunctions = require('../lib/dbFunctions');
const jwt = require('jsonwebtoken');
const developData = require('../config');
const express = require('express');
const router = express.Router();
const consts = require('../lib/consts');
const jwt_decode = require('jwt-decode');


function checkTokenAvailability(token) {
    let decodedValue = jwt_decode(token);

    if (Date.now() >= decodedValue.expires) {
        return false;
    } else {
        return decodedValue.email;
    }
}

async function userDidNotPassSecuriityCheck(token, res) {
    let mailFromToken = checkTokenAvailability(token);

    //if token is no longer valid
    if(!mailFromToken) {
        res.status(440).json({ 'data': {
            'error': {
                'error_code': consts.responseErrorExpiredToken.error_code,
                'error_description': consts.responseErrorExpiredToken.error_description
            }
        }})
    }
    //user has no admin rights
    else if (!await dbFunctions.isAdmin(mailFromToken)) {
        return res.json({ 'data': {
            'error': {
                'error_code': consts.responseErrorForbbidenAccess.error_code,
                'error_descripption': consts.responseErrorForbbidenAccess.error_description
            }
        }});
    } else {
        return false;
    }
}

function addTokenToResponse(user, req, res) {
    const payload = {
        email: user.email,
        password: user.password,
        expires: Date.now() + parseInt(developData.JWT_EXPIRATIONTIME)
    };

    req.login(payload, {session: false}, (error) => {
        if (error) {
            return{ error };
        }

        /** generate a signed json web token and return it in the response */
        const token = jwt.sign(JSON.stringify(payload), developData.JWT_SECRET);

        //add token to user obj
        if (user.error) {
            console.log('error user' + user)
            /** assign  jwt to the cookie */
            res.cookie('jwt', jwt, { httpOnly: true, secure: true });
            return { 'data': user };
        } else {
            user.jwt = token;

        }
    });
}

router.post('/login', async (req, res) => {
    passport.authenticate(
        'local',
        { session: false },
        (error, user, info) => {
            if (error || !user) {
                res.json({ 'data': {
                    'error': info
                }});
            }
    
            /** JWT result (message) */
            const payload = {
                email: user.email,
                password: user.password,
                expires: Date.now() + parseInt(developData.JWT_EXPIRATIONTIME),
            };
    
            /** assigns payload to req.user */
            req.login(payload, {session: false}, (error) => {
                if (error) {
                    res.json({ error });
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
            await addTokenToResponse(response, req, res);
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
    let securityCheck = await userDidNotPassSecuriityCheck(req.headers.token, res);

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
    let securityCheck = await userDidNotPassSecuriityCheck(req.headers.token, res);
    
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
        res.json(securityCheck)
    }
});

router.get('/details', async (req, res) => { 
    let isLoggedIn = await checkTokenAvailability(req.headers.token);

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

 module.exports = router;