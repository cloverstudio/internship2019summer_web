const Person = require('../models/Person');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const secret = require('../config');
const consts = require('../lib/consts');

module.exports = function (passport) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => {
        try {
            let user = await Person.query().findOne({
                email: email
            })
            if(!user) {
                return done(null, false, { "error_code": consts.responseErrorLoginWrongEmail.error_code, "error_description": consts.responseErrorLoginWrongEmail.error_decription });
            }
            else if (password == user.password){
                return done(null, user);
            } else {
                return done(null, false, { "error_code": consts.responseErrorLoginWrongPassword.error_code, "error_description": consts.responseErrorLoginWrongPassword.error_decription });
            }          
        } catch(err) {
            done(err)
        }  
    }));

    passport.use(new JWTStrategy({
        jwtFromRequest: req => req.cookies.jwt,
        secretOrKey: secret.JWT_SECRET,
        },
        (jwtPayload, done) => {
        /* if (Date.now() > jwtPayload.expires) {
        return done('jwt expired');
        } */
            return done(null, jwtPayload);
        }
    ));
}