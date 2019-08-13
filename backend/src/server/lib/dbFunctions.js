const Person = require('../models/Person');
const { Model } = require('objection');
const Knex = require('knex');
const config = require('../config/index');
const jwt = require('jsonwebtoken');
const developData = require('../config');
const consts = require('./consts');
const jwt_decode = require('jwt-decode');

knex = Knex({
    client: 'mysql',
    useNullAsDefault: true,
    connection: {
        host: config.database.db_host,
        user: config.database.db_user,
        password: config.database.db_password,
        database: config.database.db_name
    }
})

Model.knex(knex);

async function findAllUsers() {
    let allUsers = await knex('persons');
    return allUsers;
}

async function findAllUsersById(id) {
    let user = await knex('persons')
    .where({ ID: id });

    return user;
}

async function checkTokenAvailability(token) {
    let decodedValue = jwt_decode(token);
    
    if (Date.now() >= decodedValue.expires) {
        return false;
    } else {
        return decodedValue.email;
    }
}

async function isAdmin(email) {
    let user = await knex('persons')
    .where({ email: email });

    if (user.length == 0) {
        return false;
    } else if ( user[0].personsRoleId != 1) {
        return false;
    } else {
        return true;
    }
}
    
async function userDidNotPassSecuriityCheck(token, res) {
    let mailFromToken = await checkTokenAvailability(token);

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
    else if (!await isAdmin(mailFromToken)) {
        res.json({ 'data': {
            'error': {
                'error_code': consts.responseErrorForbbidenAccess.error_code,
                'error_descripption': consts.responseErrorForbbidenAccess.error_description
            }
        }});
    } else {
        return false;
    }
}

async function addTokenToResponse(user, req, res) {
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

async function findAllUsersBy(findBy) {
    let allUsers = await knex('persons')
    .where('firstName', 'like', `%${findBy}%`)
    .orWhere('lastName', 'like', `%${findBy}%`)
    .orWhere('oib', 'like', `%${findBy}%`)
    .orWhere('email', 'like', `%${findBy}%`)

    return allUsers;
}
async function insertNewUser(firstName, lastName, email, oib, password,) {
    let user = await knex('persons')
    .where({ email:email })
    .orWhere({ oib:oib });

    if(user.length == 0) {
        let user = await Person.query().insertGraph({
            firstName: firstName,
            lastName: lastName,
            email: email,
            personsRoleId: 2,
            oib: oib,
            password: password
        })
        return user;

    } else if (user[0].oib == oib){
        return {error: { "error_code": consts.responseErrorRegisterOIBAlreadyExists.error_code, "error_description": consts.responseErrorRegisterOIBAlreadyExists.error_description }};
    } else {
        return {error: {"error_code": consts.responseErrorRegisterEmailAlreadyExists.error_code, "error_description": consts.responseErrorRegisterEmailAlreadyExists.error_description }};
    }
}

module.exports = {
    insertNewUser,
    userDidNotPassSecuriityCheck,
    addTokenToResponse,
    findAllUsersBy,
    checkTokenAvailability,
    findAllUsers,
    findAllUsersById
}
