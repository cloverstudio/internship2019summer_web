const Person = require('../models/Person');
const { Model } = require('objection');
const Knex = require('knex');
const config = require('../config/index');
const bcrypt = require('bcryptjs');
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

module.exports = {
    addNewUser(firstName, lastName, email, oib, password, res, req) {  

        async function insterNewUser() {
            let user = await knex('persons')
            .where({ email:email })
            .orWhere({ oib:oib });

            if(user.length == 0) {
                let insertedUser = await Person.query().insertGraph({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    personsRoleId: 2,
                    oib: oib,
                    password: password
                })
                const payload = {
                    email: insertedUser.email
                };

                req.login(payload, {session: false}, (error) => {
                    if (error) {
                        return res.json({ error });
                    }

                    /** generate a signed json web token and return it in the response */
                    const token = jwt.sign(JSON.stringify(payload), secret.JWT_SECRET);
            
                    /** assign  jwt to the cookie */
                    res.cookie('jwt', jwt, { httpOnly: true, secure: true });
                    return res.json({ 'email': insertedUser.email})
                });
            } else if (user[0].oib == oib){
                return res.json({ "error_code": consts.responseErrorRegisterOIBAlreadyExists.error_code, "error_description": consts.responseErrorRegisterOIBAlreadyExists.error_decription });
            } else {
                return res.json({"error_code": consts.responseErrorRegisterEmailAlreadyExists.error_code, "error_description": consts.responseErrorRegisterEmailAlreadyExists.error_decription });
            }
        }
    
        insterNewUser()
        .catch(err => {
        console.error(err);
        });
        
    }
}

    