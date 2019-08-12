const passport = require('passport');
const dbFunctions = require('../lib/dbFunctions');
const jwt = require('jsonwebtoken');
const developData = require('../config');
const express = require('express');
const router = express.Router();

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
                password: password,
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

router.post('/register', (req, res) => {
    let user = req.body;
        
    dbFunctions.addNewUser(user.firstName, user.lastName, user.email, user.oib, user.password, res, req);
 });

 router.post('/newUser', (req, res) => {
    let user = req.body;

    dbFunctions.adminAddNewUser(user.firstName, user.lastName, user.email, user.oib, user.password, req.headers.token, res);
});

router.get('/allUsers/:searchBy?', (req, res) => {
    let findBy = req.params.searchBy;
    dbFunctions.sendUsersList(req.headers.token, res, findBy);

});

router.get('/details', (req, res) => {
    dbFunctions.getUserDetails(req.body.id, req.headers.token, res);
})

 module.exports = router;