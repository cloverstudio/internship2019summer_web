const passport = require('passport');
const dbFunctions = require('../lib/dbFunctions');
const jwt = require('jsonwebtoken');
const secret = require('../config');

module.exports = {
    authenticateUser (req, res, next) {
        passport.authenticate(
            'local',
            { session: false },
            (error, user, info) => {
        
                if (error || !user) {
                    res.json({ info });
                }
        
                /** JWT result (message) */
                const payload = {
                    email: user.email,
                    //expires: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS),
                };
        
                /** assigns payload to req.user */
                req.login(payload, {session: false}, (error) => {
                    if (error) {
                        res.json({ error });
                }
        
                /** generate a signed json web token and return it in the response */
                const token = jwt.sign(JSON.stringify(payload), secret.JWT_SECRET);
        
                /** assign jwt to the cookie */
                res.cookie('jwt', jwt, { httpOnly: true, secure: true });
                res.json({ 'email': user.email})
                });
            },
          )(req, res, next);
    },
    register (req,res) {
        let user = req.body;
        
        dbFunctions.addNewUser(user.firstName, user.lastName, user.email, user.oib, user.password, res, req);
    } 
}