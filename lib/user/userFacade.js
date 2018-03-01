"use strict";

//========================== Load Modules Start =======================

//========================== Load external modules ====================
var Promise = require("bluebird");
//========================== Load internal modules ====================
// Load user service
var _ = require("lodash");
const usrService = require('./userService');
const jwtHandler = require('../jwtHandler');
const appUtils = require('../appUtils');
// const redisClient = require("../redisClient/init");
const customExceptions = require('../customExceptions');
//========================== Load Modules End ==============================================

/**
 * @function signup
 * signup via email
 */

function signup(signupInfo){
    return usrService.signupUser(signupInfo)
        .then((result)=>{
                return result         
       
        })
}


/**
 * @function login
 * login via email
 * @param {Object} loginInfo login details
 */


function login(loginInfo) {
    return usrService.isSocialIdExist({ socialId: loginInfo.socialId })
        .bind({})
        .then(function (isExist) {
            this.isExist = isExist;
            if (isExist) {
                return usrService.login(loginInfo);
            } else {
                return usrService.signUp(loginInfo);
            }
        })
        .then(function (user) {
            this.user = user;
            var tokenObj = buildUserTokenGenObj(user);
            return jwtHandler.genUsrToken(tokenObj)
        })
        .then(function (jwt) {
            this.jwt = jwt;
            // let redisObj = appUtils.createRedisValueObject({ user: this.user });
            // redisClient.setValue(jwt, JSON.stringify(redisObj));
            // return quesService.getQues()
        })
        .then(function (ques) {
            if (this.isExist) {
                return userMapper.loginMapping({ user: this.user, jwt: this.jwt, ques, isNewUser: false });
            } else {
                return userMapper.loginMapping({ user: this.user, jwt: this.jwt, ques, isNewUser: true });
            }
        })
        .catch(function (err) {
            throw err;
        })
}
function buildUserTokenGenObj(user) {
    var userObj = {};
    userObj.deviceToken = user.deviceToken;
    userObj.platform = user.platform;
    userObj.userId = user._id;
    userObj.socialId = user.socialId;
    return userObj;
}


// function findCreateFbUser(fbUser) {
//     var otp = appUtils.getRandomOtp();
//     fbUser.otp = otp;
//     fbUser.username = fbUser.fbId;


//     return usrService.findCreateFbUser(fbUser)
//         .bind({})
//         .then(function (user) {

//             var respObj = { "isOtpSent": 1, "email": fbUser.email, "mobile": fbUser.mobile, "fbId": fbUser.fbId, "username": user.username };

//             if (!_.isNil(fbUser.mobile)) {
//                 // respObj.message = 'OTP has been sent to your mobile ' + fbUser.mobile;
//                 // smsManager.sendConnectPhoneOTP(fbUser.mobile, otp);
//             } else {
//                 respObj.message = 'OTP has been sent to your registered email.';
//                 emailManager.sendOtpEmail(fbUser.email, otp);
//             }


//             return respObj;
//         })
//         .then(function (respObj) {
//             redisClient.setValue(respObj.username, JSON.stringify({ otp: otp }));
//             return respObj;
//         })
//         .catch(function (err) {
//             throw err;
//         })
// }

// function uploadProfilePic(picReq) {
//     // var profilePicUrl = config.cfg.protocol + '://' + config.cfg.ip + ':' + config.cfg.port + '/images/' + picReq.filename;
//     var profilePicUrl = picReq.location;
//     var params = {};
//     params['profile.profilePic'] = profilePicUrl;

//     return usrService.updateUserDetails(picReq.username, params)
//         .then(function (user) {
//             user["profile.profilePic"] = profilePicUrl;
//             return mappers.uploadProfilePicResp(user);
//         })
//         .catch(function (err) {
//             throw err;
//         })
// }

// *
//  * 
//  * @param {*} params 
 
// function getUserProfile(userId) {
//     return usrService.getUserProfile(userId)
//         .bind({})
//         .then(function (user) {
//             this.users = user;
//             return tripService.getUserTrip(userId)
//         })
//         .then(function (trip) {
//             this.trips = trip;
//             return usrService.getUserConnection(userId)
//         })
//         .then(function (connection) {
//             return userMapper.userInfoResp({ user: this.users, trip: this.trips, connection: connection });

//         })
//         .catch(function (err) {
//             throw err;
//         })

// }
// /**
//  * 
//  * @param {*} params 
//  */
// function applyForOrganizer(params) {
//     return usrService.applyForOrganizer(params)
//         .then(function (result) {
//             return result;
//         })
//         .catch(function (err) {
//             throw err;
//         })

// }
// /**
//  * 
//  * @param {*} params 
//  */
// function addConnection(params) {
//     return usrService.addConnection(params)
//         .then(function (result) {
//             return result;
//         })
//         .catch(function (err) {
//             throw err;
//         })

// }
// /**
//  * 
//  * @param {*} userId 
//  */
// function getConnections(params) {
//     return usrService.getConnections(params)
//         .then(function (result) {
//             return result;
//         })
//         .catch(function (err) {
//             throw err;
//         })

// }
// /**
//  * 
//  * @param {*} params 
//  */
// function userBlockRequest(params) {
//     return usrService.userBlockRequest(params)
//         .then(function (result) {
//             return result;
//         })
//         .catch(function (err) {
//             throw err;
//         })

// }

//========================== Export Module Start ==============================

module.exports = {
    signup,
    login
    // getUserProfile,
    // applyForOrganizer,
    // addConnection,
    // getConnections,
    // userBlockRequest
};

//========================== Export Module End ===============================