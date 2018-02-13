"use strict";

//========================== Load Modules Start =======================
//========================== Load internal modules ====================
const promise = require("bluebird");
//========================== Load internal modules ====================

// Load user dao
var _ = require("lodash");
const userDao = require('./userDao');
const AppUtil   = require('../appUtils')
//========================== Load Modules End ==============================================


function signupUser(usrDetails){
    return AppUtil.generateSaltAndHashForPassword(usrDetails.password,function(result){
        usrDetails.password = result;
         return userDao.registerUser(usrDetails);
    })
    // .then((err,pwd)=>{
    //     console.log("error"+err)
    //     console.log("pwd"+pwd)
    //     if(pwd){
    //      
    //     }else{
    //         throw err
    //     }
        

    // }).catch((err)=>{
    //     console.log("in error "+err)
    // })
}

function isSocialIdExist(params) {
    return userDao.isSocialIdExist(params);
}

function login(loginInfo) {
    return userDao.login(loginInfo)
       }

function signUp(loginInfo) {
    return userDao.signUp(loginInfo)
       }

function getUserProfile(userId) {
    return userDao.getUserProfile(userId)
}
function applyForOrganizer(params) {
    return userDao.applyForOrganizer(params)
}
function addConnection(params) {
    return userDao.addConnection(params)
}

function getUserConnection(userId) {
    return userDao.getUserConnection(userId)
}
function getConnections(params) {
    return userDao.getConnections(params)
}
function userBlockRequest(params) {
    return userDao.userBlockRequest(params)
}


//========================== Export Module Start ==============================

module.exports = {
    signupUser,
    isSocialIdExist,
    login,
    signUp,
    getUserProfile,
    applyForOrganizer,
    addConnection,
    getUserConnection,
    getConnections,
    userBlockRequest
    
};

//========================== Export Module End ===============================
