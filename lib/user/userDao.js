"use strict";

//========================== Load Modules Start =======================

//========================== Load internal modules ====================
var mongoose = require("mongoose");
var promise = require("bluebird");

var _ = require("lodash");
//========================== Load internal modules ====================
const User = require('./userModel');

// init user dao
let BaseDao = new require('../dao/baseDao');
const userDao = new BaseDao(User);


//========================== Load Modules End ==============================================

function checkIfExist(usrDetails){
    let query={}
    query.email = usrDetails.email
    return userDao.findOne(query)
}



function registerUser(userInfo) {
    console.log(userInfo)
    let user = new User(userInfo);
    return userDao.save(user);

}

function login(loginInfo) {
    let query = {};
    query.socialId = loginInfo.socialId;

    let update = {};
    update.deviceToken = loginInfo.deviceToken;
    update.updated = Date.now();

    let options = {};
    options.new = true;
    return userDao.findOneAndUpdate(query, update, options);
}

function isSocialIdExist(params) {
    let query = {};
    query.socialId = params.socialId;
    let projection = { _id: 1 };
    return userDao.findOne(query)
        .then(function (result) {
            if (result) {
                return true;
            }
            else {
                return false;
            }
        })
}
function deleteUser(params) {
    let query = params.userId;
    let options = {};
    options.fields = { _id: 1 }
    return userDao.findByIdAndRemove(query, options);
}
function getUserProfile(userId) {
    console.log(userId);
    let query = {};
    // query.isActive = true;
    query._id = userId
    return userDao.find(query)
}

function getUserConnection(userId) {
    return userDao.find({ connections: userId })

}

function getConnections(params) {
    let query = {};
    let projection = {};

    query._id = params.userId;
    query.connections;
    let skip = params.pageNo * params.count;
    let limit = parseInt(params.count);
     let query1 = {};
   
 //  query.name=params.searchText;
   query1["$or"] = [{ "name": params.searchText }]
   
    projection = { connections: { $slice: [skip, limit] }}
    let sort = {};
    sort.name = 1;
    //  let populateQuery = [{path: "connections", select: "name"}];
    // return userDao.find(query, projection).populateQuery(populateQuery).sort(sort);
 
    return userDao.findOne(query, projection)
        .then(function (result) {
            let populateQuery = [{ path: "connections", select: "name email" }];
            return User.populate(result, populateQuery)
        })

}



function applyForOrganizer(params) {
    let query = {};
    query._id = params.user.userId;
    let update = {};
    update.isOrganizer = 1;
    update.updated = Date.now();
    let option = {};
    option.new = true;
    return userDao.findOneAndUpdate(query, update, option);
}


function addConnection(params) {
    let query = {};
    query._id = params.invitedByUserId;
    let update = {};
    update["$addToSet"] = { connections: params.invitedToUserId };
    update.updated = Date.now();
    let option = {};
    option.new = true;
    userDao.findOneAndUpdate(query, update, option);
    //
    let query1 = {};
    query1._id = params.invitedToUserId;
    let update1 = {};
    update1["$addToSet"] = { connections: params.invitedByUserId };
    update1.updated = Date.now();
    let option1 = {};
    option1.new = true;

    return userDao.findOneAndUpdate(query1, update1, option1);
}

function userBlockRequest(params) {
    let query = {};
    query._id = params.userId;
    let update = {};
    console.log(params.user.userId);
    update.isBlock={blockBy:params.user.userId,status:1};
    update.updated = Date.now();
    let option = {};
    option.new = true;
    return userDao.findOneAndUpdate(query, update, option);
}

//========================== Export Module Start ==============================

module.exports = {
    registerUser,
    checkIfExist,
    // login,
    // isSocialIdExist,
    // deleteUser,
    // getUserProfile,
    // applyForOrganizer,
    // addConnection,
    // getUserConnection,
    // getConnections,
    // userBlockRequest
};

//========================== Export Module End ===============================
