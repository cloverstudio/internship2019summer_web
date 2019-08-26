const passport = require('passport');
const dbFunctions = require('../lib/dbFunctions');
const express = require('express');
const router = express.Router();
const consts = require('../lib/consts');
const jwt_decode = require('jwt-decode');
const upload = require('../middlewares/multer');
const tokenFunctions = require('../lib/tokenFunctions');
const fileUploadFunctions = require('../lib/fileUploadFunctions');

router.post('/login', async (req, res) => {
    passport.authenticate(
        'local',
        { session: false },
        async (error, user, info) => {
            if (error || !user) {
                return res.json({ 'data': {
                    'error': info
                }});
            }
    
            await tokenFunctions.addTokenToResponse(user ,req, res);
            return res.json({ 'data': {
                'user': user 
            }});
        },
      )(req, res);
 });

router.post('/register', async (req, res) => {
    let user = req.body;
    let response = await dbFunctions.insertNewUser(user.firstName, user.lastName, user.email, user.oib, user.password)
    try{
        if (response.error) {
            res.json({ 'data': response
        })} else {
            await tokenFunctions.addTokenToResponse(response, req, res);
            res.json({ 'data': {
                'user': response
            }});
        } 
    } catch (err) {
        console.log(err);
    }       
 });

 router.post('/newUser', async (req, res) => {
    let user = req.body;
    let securityCheck = await tokenFunctions.userDidNotPassSecuriityCheck(req.headers.token, res);

    if (securityCheck) {
        return res.status(440).json(securityCheck);
    }

    let data = await dbFunctions.insertNewUser(user.firstName, user.lastName, user.email, user.oib, user.password);

    // if email/oib are taken
    if (data.error) {
        res.json({
            'data': data
        });
    }
    else {
        res.json({ 'data': {
            'user': data
        }});
    }
});

router.get('/allUsers', async (req, res) => {
    let findBy = req.body.searchBy || undefined;
    let securityCheck = await tokenFunctions.userDidNotPassSecuriityCheck(req.headers.token, res);
    
    if(!securityCheck && findBy) {
        let user = await dbFunctions.findAllUsersBy(findBy);

        return res.json({ 'data': {
            'user': user
        }});
    }
    else if (!securityCheck && !findBy) {
        let allUsers = await dbFunctions.findAllUsers();

        return res.json({ 'data': {
            'user': allUsers
        }});
    }
    else {
        res.status(440).json(securityCheck)
    }
});

router.get('/details/:id', async (req, res) => {
    let userId = req.params.id;
    let isLoggedIn = tokenFunctions.checkTokenAvailability(req.headers.token);

    let user = await dbFunctions.findAllUsersById(userId);

    if (user.length > 0 && isLoggedIn) {
        res.json({ 'data': {
            'user': {
                'firstName': user[0].firstName,
                'lastName': user[0].lastName,
                'oib': user[0].oib,
                'email': user[0].email,
                'image': user[0].image
            }
        }})
    } else if (isLoggedIn && user.length == 0){
        res.json({ 'data': {
            'error': {
                'error_code': consts.responseErrorUserDetailUnknownId.error_code,
                'error_description': consts.responseErrorUserDetailUnknownId.error_description,
            }
        }})
    } else {
        res.json({ 'data': {
            'error': {
                'error_code': consts.responseErrorExpiredToken.error_code,
                'error_description': consts.responseErrorExpiredToken.error_description,
            }
        }})
    }
})

router.post('/logout', (req, res) => {
    let token = req.headers.token;
    jwt_decode(token).expires = null;

    res.json('success!');
})

router.put('/newUser/:id', upload.single('photo'), async (req, res) => {

    let token = req.headers.token;
    let securityCheck = await tokenFunctions.userDidNotPassSecuriityCheck(token, res);
    let imagePath = fileUploadFunctions.checkImageUpload(req.file);
    let userObj = req.body;
    let userId = req.params.id;

    userObjKey = Object.keys(userObj);   //delete null properties from object
    for( let i = 0; i < userObjKey.length; i++) {
        if (!userObj[userObjKey[i]]) {
            delete userObj[userObjKey[i]];
        }
    }

    if (securityCheck) {
        return res.status(440).json(securityCheck);
    }

    let data = await dbFunctions.updateUser(userObj, imagePath, userId);

    if (data.error) {
        res.json({
            'data': data
        });
    }
    else {
        res.json({ 'data': {
            'user': data
        }});
    }
})

router.put('/myProfile', upload.single('photo'), async (req, res) => {
    let userObj = req.body;
    let token = req.headers.token;
    let isLoggedIn = tokenFunctions.checkTokenAvailability(token);
    let userId = await dbFunctions.findUserID(jwt_decode(token).email);
    let imagePath = fileUploadFunctions.checkImageUpload(req.file);
    let userPassword = undefined;
   
    if(!isLoggedIn) {
        return res.status(440).json({ 'data': {
            'error': {
                'error_code': consts.responseErrorExpiredToken.error_code,
                'error_description': consts.responseErrorExpiredToken.error_description
            }
        }});
    }

    if(userObj.currentPassword) { // assing value to password if user tries to change password
        userPassword = await dbFunctions.findUsersPassword(userId);
    }

    let currentPassword = userObj.currentPassword;
    let newPassword2 = userObj.newPassword2;


    delete userObj.currentPassword //remove passwords from userObj wich are not going to be saved
    delete userObj.newPassword2; //  <-

    //password check
    if (currentPassword && userPassword.password != currentPassword) { //if user is logged, and tries to change pass, but current password is wrong
        return res.json({ 'data': {
            'error': {
                'error_code': consts.responseErrorLoginWrongPassword.error_code,
                'error_description': consts.responseErrorLoginWrongPassword.error_description
            }
        }});
    } else if (currentPassword && userObj.password != newPassword2) { //if user is logged, and tries to change pass, but new password and new password check do not match
        return res.json({ 'data': {
            'error': {
                'error_code': consts.responseErrorPasswordsDoNotMatch.error_code,
                'error_description': consts.responseErrorPasswordsDoNotMatch.error_description
            }
        }});
    } 

    let data = await dbFunctions.updateUser(userObj, imagePath, userId);

    if (data.error) { 
        res.json({
            'data': data
        });
    }
    else {
        res.json({ 'data': {
            'user': data
        }});
    } 
})

module.exports = router;