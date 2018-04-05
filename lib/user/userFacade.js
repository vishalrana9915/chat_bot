'use strict';

//========================== Load Modules Start =======================

//========================== Load external modules ====================
var promise = require("bluebird");
//========================== Load internal modules ====================
// Load user service
var _ = require("lodash");
const usrService = require('./userService');
const jwtHandler = require('../jwtHandler');
const AppUtil   = require('../appUtils');
// const redisClient = require("../redisClient/init");
const customExceptions = require('../customExceptions');
const userMapper = require('./userMapper');
//========================== Load Modules End ==============================================

/**
 * @function signup
 * signup via email
 */

function signup(signupInfo){
    return usrService.signupUser(signupInfo)
        .then((result)=>{
                return result;      
        });
}
/**
 * @function login
 * login via email
 * @param {Object} loginInfo login details
 */


function login(loginInfo) {
    return usrService.isUserExist(loginInfo)
        .then(function (isExist) {
            if (isExist) {
                return AppUtil.verifyPassword(loginInfo,isExist).then((valid)=>{
                    if(valid){
                                 return jwtHandler.genUsrToken({name:isExist.fullName,userId : isExist._id,email : isExist.email}).then((jwt)=>{
                                     return usrService.dailyUsers(isExist,"LOGIN").then(count=>userMapper.loginMapping({ user: isExist, jwt: jwt}));
                             });
                    }else{  
                    return userMapper.passwordMismatch();
                    }
                });
            } else {
                return userMapper.userNotExist();
            }
        });  
}

/**
 * @function current User details
 * via token
 * @headers token
 */
function currentUser(request) {
    return jwtHandler.verifyUsrToken(request.headers.authorization)
        .then((result)=>{
            console.log("result==>"+JSON.stringify(result,null,2));
        return userMapper.currentUser(result);
    });
}

/**
 * @function search User Friends
 * details using regex
 * @params getting keyword
 */

function search_friends(userSearchDetails){
            return usrService.search_friends(userSearchDetails.query,userSearchDetails.user)
            .then((searchedFriends)=>{
                    return userMapper.searchedFriendsResponse(searchedFriends);
            } );
}

/**
 * @function creating room for chat
 */
function createRoom(raw_details){
    return usrService.createRoom(raw_details.user,raw_details.body)
    .then(result=>userMapper.roomCreated(result));  
}

/**
 * @function sending message
 */
function sendMessage(requestDetails){
        return usrService.sendMessage(requestDetails.user,requestDetails.body)
            .then(result=>userMapper.messageSent(result));
}


/**
 * @function sending friend request
 */
function sendRequest(requestDetails){
    return usrService.checkNotification(requestDetails.user,requestDetails.body)
    .then((result)=>{
        if(result){
            return userMapper.alreadySentMessage();
        }else{
        return usrService.sendRequest(requestDetails.user,requestDetails.body)
        .then(value=>userMapper.requestSent(value));   
        }
    });
}

/**
 * @function visualising user friends
 */
function showUserFriendRequests(requested){
        return usrService.showUserFriendRequests(requested)
        .then(result=> userMapper.showNotification(result));
}

/**
 * @function accept/reject user friend request
 */

function acceptRejectFriendRequests(request,user){
     return usrService.acceptRejectFriendRequests(request,user)
        .then(result=> userMapper.acceptRejectFriendRequests(request.action));
}

/**
 * @function checking daily activity on portal
 */

function dailyActivity(){
    return usrService.dailyActivity()
        .then(result=> {
            if(result[1]){
           return  userMapper.dailyActivity(result[1])
        }
            else{
           return userMapper.dailyActivity(result)}
            }
            );
}

//========================== Export Module Start ==============================

module.exports = {
    signup,
    login,
    currentUser,
    search_friends,
    createRoom,
    sendMessage,
    sendRequest,
    showUserFriendRequests,
    acceptRejectFriendRequests,
    dailyActivity
    };

//========================== Export Module End ===============================