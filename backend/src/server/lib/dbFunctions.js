const Person = require('../models/Person');
const { Model } = require('objection');
const Knex = require('knex');
const config = require('../config/index');
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

async function findAllUsers() {
    let allUsers = await knex('persons');
    return allUsers;
}

async function findAllUsersById(id) {
    let user = await knex('persons')
    .where({ ID: id });

    return user;
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
    
async function findAllUsersBy(findBy) {
    let allUsers = await knex('persons')
    .where('firstName', 'like', `%${findBy}%`)
    .orWhere('lastName', 'like', `%${findBy}%`)
    .orWhere('oib', 'like', `%${findBy}%`)
    .orWhere('email', 'like', `%${findBy}%`)

    return allUsers;
}

async function userAlreadyExists(email, oib) {
    let user = await knex('persons')
    .where({ email:email })
    .orWhere({ oib:oib });

    if (user.length == 0) {
        return false;
    } else if (user[0].oib == oib){
        return {error: { "error_code": consts.responseErrorRegisterOIBAlreadyExists.error_code, "error_description": consts.responseErrorRegisterOIBAlreadyExists.error_description }};
    } else {
        return {error: {"error_code": consts.responseErrorRegisterEmailAlreadyExists.error_code, "error_description": consts.responseErrorRegisterEmailAlreadyExists.error_description }};
    }
}
async function insertNewUser(firstName, lastName, email, oib, password,) {
    let user = await userAlreadyExists(email, oib);

    if (!user) {
        let newUser = await Person.query().insertGraph({
            firstName: firstName,
            lastName: lastName,
            email: email,
            personsRoleId: 2,
            oib: oib,
            password: password
        })
        return newUser;

    } else {
        return user;
    }
}

async function updateUser(firstName, lastName, email, oib, password, image, id) {
    let user = await userAlreadyExists(email, oib);

    if (!user) {
        await knex('persons')
        .where({ ID: id })
        .update({ firstName: firstName, lastName: lastName, email: email, oib: oib, password: password, image: `uploads/photos/${image}` });

        return 'uspješno izmijenjeno';
    } else {
        return user;
    }
}

module.exports = {
    insertNewUser,
    isAdmin,
    findAllUsersBy,
    findAllUsers,
    findAllUsersById,
    updateUser
}
