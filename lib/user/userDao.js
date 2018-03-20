'use strict';

//========================== Load Modules Start =======================

//========================== Load internal modules ====================
var mongoose = require("mongoose");
var promise = require("bluebird");

var _ = require("lodash");
//========================== Load internal modules ====================
const User = require('./userModel');
const Room = require('../socket/socketRoomModel');
const Chat = require('../socket/socketModel');
// init user dao
let BaseDao = new require('../dao/baseDao');
const userDao = new BaseDao(User);
const roomDao  = new BaseDao(Room);
const chatDao  = new BaseDao(Chat);
//========================== Load Modules End ==============================================

function checkIfExist(usrDetails){
    let query={};
    query.email = usrDetails.email;
    return userDao.findOne(query);
}



function registerUser(userInfo) {
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


function search_friends(search_field,activeUser){
    let query ={};
    query.isActive = 1;
    query["$or"] = [{fullName:{$regex:search_field,$options:"i"}},{userName:{$regex:search_field,$options:"i"}}];
    query["_id"] = {$ne:activeUser.userId};
    let projection = {password:0,friends:0,friendRequest:0,fullName:0};
    return userDao.find(query,projection);
}


function createRoom(userDetails,roomDetails){
    let room = new Room(roomDetails);
    return roomDao.save(room);
}

function sendMessage(sender,chatDetails){
    chatDetails["senderDetails.fullName"] = sender.fullName;
    chatDetails["senderDetails.senderId"] = sender.userId;
    let chat = new Chat(chatDetails);
    return chatDao.save(chat);
}

function sendRequest(sender,details){
    let query={};
    query._id = details.userId;
    query.isActive = 1;
    let update={};
    update["$addToSet"] = { notifications: {type:"FRIENDREQUEST",sender:{name:sender.name,userId:sender.userId},content:details.content || ''}};
    let option = {};
    option.new = true;
    return userDao.findOneAndUpdate(query, update, option);
}

function checkNotificationStatus(sender,details){
let query ={};
query._id = details.userId;
query.isActive =1;
var userid = mongoose.Types.ObjectId(sender.userId);
query["notifications.sender.userId"] = userid;
    return userDao.findOne(query);
}

function showUserFriendRequests(userId){
        let query = [{$match:{_id:mongoose.Types.ObjectId(userId)}},{$project:{notifications:1,_id:0}},
        {
            $unwind: '$notifications'
        },
        {
            $group:{
            _id:'$notifications.type',
            request:{$push:{content:"$notifications.content",status:'$notifications.status',senderName:'$notifications.sender.name',sender:'$notifications.sender.userId',notificationId:'$notifications._id'}}
                }
            }


            
            ];
        console.log("aggregate==>"+JSON.stringify(query,null,2));
        return userDao.aggregate(query);
    }

function acceptRejectFriendRequests(userResponse){
    let query = {}

    query["notifications._id"] = mongoose.Types.ObjectId(userResponse.notificationId)

    let update={}
    update["$set"] =  {"notifications.$.status":userResponse.action}
    let options={}
    options["new"] = true
    console.log
    return userDao.findOneAndUpdate(query,update,options)
}
//========================== Export Module Start ==============================

module.exports = {
    registerUser,
    checkIfExist,
    search_friends,
    createRoom,
    sendMessage,
    login,
    sendRequest,
    checkNotificationStatus,
    showUserFriendRequests,
    acceptRejectFriendRequests
};

//========================== Export Module End ===============================
