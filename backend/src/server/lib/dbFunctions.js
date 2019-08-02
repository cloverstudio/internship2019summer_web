const Person = require('../models/Person');
const personTable = require('../db/migrations/personTable');
const { Model } = require('objection');
const Knex = require('knex');
const config = require('../config/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config');

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
            await bcrypt.hash(password, 10)
            .then(async hashPassword => {
            await knex('persons')
            .where({ email:email })
            .orWhere({ oib:oib })
            .then(async user => {
                if(user.length == 0) {
                    await Person.query().insertGraph({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        personsRoleId: 2,
                        oib: oib,
                        password: hashPassword
                    }).then(user => {
                        const payload = {
                            email: user.email,
                        };
                        req.login(payload, {session: false}, (error) => {
                            if (error) {
                                res.status(400).send({ error });
                        }
                
                        /** generate a signed json web token and return it in the response */
                        const token = jwt.sign(JSON.stringify(payload), secret.JWT_SECRET);
                
                        /** assign  jwt to the cookie */
                        res.cookie('jwt', jwt, { httpOnly: true, secure: true });
                        res.send({ 'email': user.email})
                        });
                    })
                }else if (user[0].oib == oib){
                    res.json({ "error_code":1002, "error_description":"OIB se već koristi!"});
                } else {
                    res.json({"error_code":1003, "error_description":"Email se već koristi!"});
                }
            })

            })
        }
    
        personTable()
        .then(() => insterNewUser())
        .catch(err => {
        console.error(err);
        });
        
    }
}

    