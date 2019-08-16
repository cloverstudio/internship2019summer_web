const consts = require('../lib/consts');
const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken');
const developData = require('../config');

function checkTokenAvailability(token) {
    let decodedValue = jwt_decode(token);

    if (Date.now() >= decodedValue.expires) {
        return false;
    } else {
        return decodedValue.email;
    }
}

async function userDidNotPassSecuriityCheck(token) {
    let mailFromToken = checkTokenAvailability(token);

    //if token is no longer valid
    if(!mailFromToken) {
        return { 'data': {
            'error': {
                'error_code': consts.responseErrorExpiredToken.error_code,
                'error_description': consts.responseErrorExpiredToken.error_description
            }
        }}
    }
    //user has no admin rights
    else if (!await dbFunctions.isAdmin(mailFromToken)) {
        return { 'data': {
            'error': {
                'error_code': consts.responseErrorForbbidenAccess.error_code,
                'error_descripption': consts.responseErrorForbbidenAccess.error_description
            }
        }};
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
            /** assign  jwt to the cookie */
            res.cookie('jwt', jwt, { httpOnly: true, secure: true });
            return { 'data': user };
        } else {
            user.jwt = token;
        }
    });
}

module.exports = {
    addTokenToResponse,
    userDidNotPassSecuriityCheck,
    checkTokenAvailability
}