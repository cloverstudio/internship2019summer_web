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

async function findUsersPassword(id) {
    let password = await knex('persons')
    .where({ID: id})
    .select('password');

    return password[0];
}

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
    .orWhere({ oib:oib || null });

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
            image: photoName
        })
        return newUser;

    } else {
        return user;
    }
}

async function updateUser(userObj, imagePath, id) {
    try{
        let user = false;
        if (userObj.email || userObj.oib) { // if oib or email are going to be updated, first check if they are available
            user = await userAlreadyExists(userObj.email, userObj.oib);
        }
        if (imagePath) {
            userObj.image = imagePath; //add image path to user object
        }

        if (!user) {    
            await knex('persons')
            .where({ ID: id })
            .update(userObj);

            return 'updated!';
        } else {
            return user;
        }
    } catch (err) {
        console.log(err);
    }
}

async function newRequest(requestObj, userId, imagePath) {
    if (imagePath) {
        requestObj.image = imagePath;
    }

    await knex('requests')
    .insert({ 
        Title: requestObj.Title,
        Request_type: requestObj.Request_type,
        location_latitude: requestObj.location_latitude,
        location_longitude: requestObj.location_longitude,
        message: requestObj.message,
        userID: userId,
        image: requestObj.image,
        Address: requestObj.Address,
        createdAt: Date.now()
     });
}

async function updateRequest(requestObj, imagePath, id) {
    
    if(imagePath) {
        requestObj.image = imagePath
    }
    requestObj.updatedAt = Date.now();

    await knex('requests')
    .where({ ID: id })
    .update(requestObj)
}

async function findAllRequestsMadeBy(id) {
    let allRequests = await knex('requests')
    .where({ userID: id })
    .orderBy([{ column: 'updatedAt', order: 'desc' }, { column: 'createdAt', order: 'desc' }]);

    return allRequests;
}

async function findAllRequestsMadeByWithSearchTerm(id, findBy) {
    let allRequests = await knex('requests')
    .where({ userID: id })
    .where('Request_type', 'like', `%${findBy}%`)
    .orderBy([{ column: 'updatedAt', order: 'desc' }, { column: 'createdAt', order: 'desc' }]);

    return allRequests;
}

async function addNews(newsObj, imagePath, filePath, userId) {
    await knex('news')
    .insert({
        MadeBy: userId,
        Title: newsObj.Title,
        Message: newsObj.Message,
        Location_latitude: newsObj.Location_latitude,
        Location_longitude: newsObj.Location_longitude,
        Address: newsObj.Address,
        Images: imagePath,
        Files: filePath,
        CreatedAt: Date.now()
    })

}

async function updateNews(newsObj, image, file, id) {
    try{
        newsObj.Images = image;
        newsObj.Files = file;
        newsObj.updatedAt = Date.now();

        await knex('news')
        .where({ iD: id })
        .update(newsObj)

    } catch (err) {
        console.log(err);
    }
}

async function getAllNews() {
    let allNews = await knex.from('news')
    .innerJoin('persons', 'news.MadeBy', 'persons.ID')
    .select('firstName', 'lastName', 'Title', 'news.ID', 'Location_latitude', 'Location_longitude', 'Address', 'Message', 'CreatedAt', 'UpdatedAt', 'Files', 'Images');
    return allNews;
}

async function getAllRequests() {
    let allRequests = await knex('requests');
    return allRequests;
}

module.exports = {
    insertNewUser,
    isAdmin,
    findAllUsersBy,
    findAllUsers,
    findAllUsersById,
    updateUser,
    findUserID,
    newRequest,
    updateRequest,
    findAllRequestsMadeBy,
    findAllRequestsMadeByWithSearchTerm,
    findUsersPassword,
    addNews,
    updateNews,
    getAllNews,
    getAllRequests
}
