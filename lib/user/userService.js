'use strict';

//========================== Load Modules Start =======================
//========================== Load External modules ====================
const promise = require("bluebird");
var _ = require("lodash");
//========================== Load internal modules ====================
// Load user dao
const userDao = require('./userDao');
const AppUtil   = require('../appUtils');
const userMapper = require('./userMapper');
//========================== Load Modules End ==============================================


function signupUser(usrDetails){
    return userDao.checkIfExist(usrDetails).then((exist)=>{
     if(exist){
        return  userMapper.userExist();            
     }else{
        return AppUtil.generateSaltAndHashForPassword(usrDetails.password).then((result)=>{
         if(result){
            usrDetails.password = result;
            return userDao.registerUser(usrDetails).then((data)=>{
                return userMapper.registerMapping(data._id);
                    });
                  }
              });
           }
        }) ;
    }


 function isUserExist(details){
    return userDao.checkIfExist(details)
    .then((result) => {
        return result;
    });
 }


 function search_friends(query,activeUser){
    return userDao.search_friends(query.search,activeUser)
    .then((result)=>{
        return result;
    });
 }

function createRoom(userDetails,roomDetails){
 return userDao.createRoom(userDetails,roomDetails)
    .then((result)=>{
        return result;
    });
}


function sendMessage(senderdetails,details){
    return userDao.sendMessage(senderdetails,details)
        .then(result=> result);     
}


function sendRequest(sender,details){
    return userDao.sendRequest(sender,details)
        .then(result=> result);
}

function checkNotification(sender,details){
    return userDao.checkNotificationStatus(sender,details)
    .then((result)=> result);
}

function showUserFriendRequests(userData){
        return userDao.showUserFriendRequests(userData.userId)
        .then(result=> result);
}

function acceptRejectFriendRequests(userRequest){
        return userDao.acceptRejectFriendRequests(userRequest)
        .then(result=> result);
}
//========================== Export Module Start ==============================

module.exports = {
    signupUser,
    isUserExist,
    search_friends,
    createRoom,
    sendMessage,
    sendRequest,
    checkNotification,
    showUserFriendRequests,
    acceptRejectFriendRequests
};

//========================== Export Module End ===============================
