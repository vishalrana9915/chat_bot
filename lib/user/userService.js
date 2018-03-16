'use strict';

//========================== Load Modules Start =======================
//========================== Load internal modules ====================
const promise = require("bluebird");
//========================== Load internal modules ====================

// Load user dao
var _ = require("lodash");
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
    return userDao.search_friends(query.search,activeUser).then((result)=>{
        return result;
    })
 }

// function isSocialIdExist(params) {
//     return userDao.isSocialIdExist(params);
// }

// function login(loginInfo) {
//     return userDao.login(loginInfo)
//        }

// function signUp(loginInfo) {
//     return userDao.signUp(loginInfo)
//        }

// function getUserProfile(userId) {
//     return userDao.getUserProfile(userId)
// }
// function applyForOrganizer(params) {
//     return userDao.applyForOrganizer(params)
// }
// function addConnection(params) {
//     return userDao.addConnection(params)
// }

// function getUserConnection(userId) {
//     return userDao.getUserConnection(userId)
// }
// function getConnections(params) {
//     return userDao.getConnections(params)
// }
// function userBlockRequest(params) {
//     return userDao.userBlockRequest(params)
// }


//========================== Export Module Start ==============================

module.exports = {
    signupUser,
    isUserExist,
    search_friends
    // isSocialIdExist,
    // login,
    // signUp,
    // getUserProfile,
    // applyForOrganizer,
    // addConnection,
    // getUserConnection,
    // getConnections,
    // userBlockRequest
    
};

//========================== Export Module End ===============================
