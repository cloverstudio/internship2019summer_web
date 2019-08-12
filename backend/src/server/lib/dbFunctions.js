const Person = require('../models/Person');
const { Model } = require('objection');
const Knex = require('knex');
const config = require('../config/index');
const jwt = require('jsonwebtoken');
const secret = require('../config');
const consts = require('./consts');

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

async function addTokenToResponse(user, req, res, email, password) {
    const payload = {
        email: email,
        password: password
    };
    
    req.login(payload, {session: false}, (error) => {
        if (error) {
            res.json({ error });
        }

        /** generate a signed json web token and return it in the response */
        const token = jwt.sign(JSON.stringify(payload), secret.JWT_SECRET);

        //add token to user obj
        if (user.error) {
            /** assign  jwt to the cookie */
            res.cookie('jwt', jwt, { httpOnly: true, secure: true });
            return res.json({ 'data': user });
        } else {
            user.jwt = token;
            res.json ({ 'data': {
                'user': user
            }});

        }
    });
}

async function insterNewUser(firstName, lastName, email, oib, password, res) {
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
        return user ;

    } else if (user[0].oib == oib){
        return {error: { "error_code": consts.responseErrorRegisterOIBAlreadyExists.error_code, "error_description": consts.responseErrorRegisterOIBAlreadyExists.error_decription }};
    } else {
        return {error: {"error_code": consts.responseErrorRegisterEmailAlreadyExists.error_code, "error_description": consts.responseErrorRegisterEmailAlreadyExists.error_decription }};
    }
}

module.exports = {
    addNewUser(firstName, lastName, email, oib, password, res, req) {     
        insterNewUser(firstName, lastName, email, oib, password, res)
        .then(user => {
            addTokenToResponse(user, req, res, email, password);
        })      
        .catch(err => {
        console.error(err);
        });
        
    },
    async adminAddNewUser(firstName, lastName, email, oib, password, adminEmail, res) {     
        let data = await insterNewUser(firstName, lastName, email, oib, password, res);
        if (!await isAdmin(adminEmail)) {
            res.json({ data: {
                'error': {
                    'error_code': consts.responseErrorForbbidenAccess.error_code,
                    'error_descripption': consts.responseErrorForbbidenAccess.error_decription
                }
            }});
        } else if (data.error) {
            res.json({
                'data': data
            });
        } else {
            res.json({ 'data': {
                'user': data
            }});
        }  
    },
    async sendUsersList(email, res, findBy) {
        if(await isAdmin(email) && findBy) {
            let allUsers = await knex('persons')
            .where('firstName', 'like', `%${findBy}%`)
            .orWhere('lastName', 'like', `%${findBy}%`)
            .orWhere('oib', 'like', `%${findBy}%`)
            .orWhere('email', 'like', `%${findBy}%`)

            res.json({ 'data': allUsers});           
        }
        else if (await isAdmin(email) && !findBy) {
            let allUsers = await knex('persons');

            res.json({ 'data': {
                'user': allUsers 
            }});
        }
        else {
            res.json({ 'data': {
                'error': {
                    'error_code': consts.responseErrorForbbidenAccess.error_code,
                    'error_descripption': consts.responseErrorForbbidenAccess.error_decription
                }
            }});
        }
    },
    async getUserDetails(id, res) {
        let user = await knex('persons')
        .where({ ID: id });
        
        if (await user.length > 0) {
            res.json({ 'data': {
                'user': {
                    'firstName': user[0].firstName,
                    'lastName': user[0].lastName,
                    'oib': user[0].oib,
                    'email': user[0].email
                }
            }})
        } else {
            res.json({ 'data': {
                'error': {
                    'error_code': consts.responseErrorUserDetailUnknownId.error_code,
                    'error_description': consts.responseErrorUserDetailUnknownId.error_decription,
                }
            }})
        }
    }
}

    