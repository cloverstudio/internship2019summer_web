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

async function findUserID(email) {
    let userId = await knex('persons')
    .where({ email: email})
    return userId[0].ID;
}

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
    .where({ email:email || null })
    .orWhere({ oib:oib });

    if (user.length == 0) {
        return false;
    } else if (user[0].oib == oib){
        return {error: { "error_code": consts.responseErrorRegisterOIBAlreadyExists.error_code, "error_description": consts.responseErrorRegisterOIBAlreadyExists.error_description }};
    } else {
        return {error: {"error_code": consts.responseErrorRegisterEmailAlreadyExists.error_code, "error_description": consts.responseErrorRegisterEmailAlreadyExists.error_description }};
    }
}
async function insertNewUser(firstName, lastName, email, oib, password, photoName) {
    let user = await userAlreadyExists(email, oib);

    if (!user) {
        let newUser = await Person.query().insertGraph({
            firstName: firstName,
            lastName: lastName,
            email: email,
            personsRoleId: 2,
            oib: oib,
            password: password,
            image: `uploads/photos/${photoName}`
        })
        return newUser;

    } else {
        return user;
    }
}

async function updateUser(userObj, imagePath, id) {
    let user = false;
    if (userObj.email || userObj.oib) { // if oib or email are going to be updated, first check if they are available
        user = await userAlreadyExists(userObj.email, userObj.oib);
    }
    if (imagePath) {
        userObj.image = imagePath; //add image path to user object
    }
    let userObjKeys = Object.keys(userObj);

    if (!user) {
        for (let i = 0; i < userObjKeys.length; i++) {
            await knex('persons')
            .where({ ID: id })
            .update({ [userObjKeys[i]]: userObj[userObjKeys[i]] });
        }
        return 'updated!';
    } else {
        return user;
    }
}

async function newRequest(title, type, location_latitude, location_longitude, message, userId) {
    await knex('requests')
    .insert({ 
        Title: title,
        Request_type: type,
        location_latitude: location_latitude,
        location_longitude: location_longitude,
        message: message,
        userID: userId
     })
}

module.exports = {
    insertNewUser,
    isAdmin,
    findAllUsersBy,
    findAllUsers,
    findAllUsersById,
    updateUser,
    findUserID,
    newRequest
}
