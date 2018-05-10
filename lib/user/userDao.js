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
const Count = require('./signupModel')
// init user dao
let BaseDao = new require('../dao/baseDao');
const userDao = new BaseDao(User);
const roomDao  = new BaseDao(Room);
const chatDao  = new BaseDao(Chat);
const countDao  = new BaseDao(Count);

//============================Encryption Method============================================
// Create Base64 Object
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
// Base64.decode(encodedString);

//========================== Load Modules End ==============================================

function createUserData(userInfo){
    console.log(userInfo)
    let userData ={
        userId: mongoose.Types.ObjectId(userInfo._id),
        fullName:userInfo.fullName || "",
        createdAt:userInfo.created,
        country:userInfo.country || ""
    }
        return userData;
}

function checkIfExist(usrDetails){
    let query={};
    query.email = usrDetails.email;
    return userDao.findOne(query);
}

function checkById(userId){
    let query={};
    query._id= userId;
    let select={password:0}
    return userDao.findOne(query,select);
}

function registerUser(userInfo) {
    let user = new User(userInfo);
    return userDao.save(user);

}


function incCountRegister(previlage,countType){

    let query={};
    let lastNight = new Date().setHours(0,0,0,0)
    let nextNight = new Date().setHours(24,0,0,0)
    query.type= countType;
    query.status = "ACTIVE";
    query["$and"] = [{recordEntry:{$gte:lastNight}},{recordEntry:{$lte:nextNight}}];
    query['privileged'] = previlage
    return countDao.findOne(query);

}

function incrementCount(userInfo,countType){

    let update={}
    var objectCreated =createUserData(userInfo);
    console.log(objectCreated)
    update["recordEntry"] = new Date().getTime();
    update["type"] = countType;
    update["users"] = objectCreated;
    update["$inc"] = {count:1};
    update["privileged"] = userInfo.privileged;

    var Counting = new Count(update)
        return countDao.save(Counting);
}


function updateCount(id,userData){
    let query={}
    query._id = id;
    var userInfo = createUserData(userData);
    let update={}
    update["$addToSet"] = {users:userInfo}
    update['$inc'] = {count:1};

    return countDao.update(query,update);

}

function search_friends(search_field,activeUser){
    let query ={};
    query.isActive = 1;
    query["$or"] = [{fullName:{$regex:search_field,$options:"i"}},{userName:{$regex:search_field,$options:"i"}}];
    query["_id"] = {$ne:activeUser.userId};
    let projection = {'notifications.sender':1,_id:1,fullName:1,picture:1};
    return userDao.find(query,projection);
}


function createRoom(roomDetails,userDetails){
        // roomDetails.members.push(userDetails)
        let room = new Room(roomDetails);
        return roomDao.save(room);
    // }
    
}

function sendMessage(sender,chatDetails){
    chatDetails['message'] = Base64.encode(chatDetails.message)
    chatDetails["senderDetails.fullName"] = sender.name;
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
        return userDao.aggregate(query);
    }

function acceptRejectFriendRequests(userResponse){
    let query = {};
    query["notifications._id"] = mongoose.Types.ObjectId(userResponse.notificationId);
    query['notifications.status'] = "PENDING";
    let update={};
    update['$pull'] = {'notifications':{'_id':mongoose.Types.ObjectId(userResponse.notificationId)}};
    return userDao.findOneAndUpdate(query,update)
}


function updateSenderReciever(sender,reciever){
        let query={};
        query['_id'] = mongoose.Types.ObjectId(sender);
        query['isActive'] = 1;
        let update={}
        update['$addToSet'] = {friends:mongoose.Types.ObjectId(reciever)}

        let query1={};
        query1['_id'] = mongoose.Types.ObjectId(reciever);
        query1['isActive'] = 1;
        let update1={}
        update1['$addToSet'] = {friends:mongoose.Types.ObjectId(sender)}

        return userDao.findOneAndUpdate(query,update)
        .then((result1)=>{
            return userDao.findOneAndUpdate(query1,update1);
        })
}


function dailyActivity(){

    let lastNight = new Date().setHours(0,0,0,0)
    let nextNight = new Date().setHours(24,0,0,0)
  

    let query = [
    {
        '$match':
        {'$and':[{'recordEntry':{$gte:lastNight}},{'recordEntry':{$lte:nextNight}}],'status':"ACTIVE"}
        
    },
                    {
                        '$project':
                        {type:1,privileged:1,count:1}
                    },
                    {
                        '$group':
                                {
                                    _id:"$type",
                                    data:{$push:{counts:"$count",details:"$users",type:"$privileged"}},
                                    totalCounts:{$sum:"$count"}
                                }
                    }         
            ];

       return countDao.aggregate(query)
}


function viewRoom(userId){
    let query={};
    query.isActive=1;
    query.members=mongoose.Types.ObjectId(userId);
    return roomDao.findAndPopulate(query,'members');
}

function viewAll(userId){
    let query={};
    query.isActive=1;
    query._id={$ne:userId}
    var projection={_id:1,fullName:1,email:1}
    return userDao.find(query,projection);
}

function checkRoomExist(user,room){
    console.log(user)
    console.log(room)
    room.members.push(user);
    let query={}
    query.members = {$all:room.members};
    query.isActive=1;
    return roomDao.find(query);
}

function getChat(roomId){
    let query={}
    query.isActive=1;
    query.roomId = roomId;

    return chatDao.find(query);
}
//========================== Export Module Start ==============================

module.exports = {
    registerUser,
    checkIfExist,
    search_friends,
    createRoom,
    sendMessage,
    sendRequest,
    checkNotificationStatus,
    showUserFriendRequests,
    acceptRejectFriendRequests,
    updateSenderReciever,
    incCountRegister,
    incrementCount,
    updateCount,
    dailyActivity,
    checkById,
    viewRoom,
    viewAll,
    checkRoomExist,
    getChat
};

//========================== Export Module End ===============================
