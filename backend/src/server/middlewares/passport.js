const Person = require('../models/Person');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const bcrypt = require('bcrypt-nodejs');
const secret = require('../config');
const passport = require('passport');

module.exports = function (passport) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => {
        try {
            await Person.query().findOne({
                email: email
            }).then(user => {
                if(!user) {
                    return done(null, false, { "error_code":1000, "error_description":"Krivi email!" });
                }
                else {
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { "error_code":1000, "error_description":"Krivi email!" });
                        }
                    });
                }
            })       
        } catch (error) {
            done(error);
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