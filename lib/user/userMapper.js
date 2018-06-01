/**
 * This file will have request and response object mappings.
 *
 * Created by vishal on 5/03/18.
 */

var _ = require("lodash");
const contstants = require("../constants");
const config = require('../config');


function registerMapping(params) {
    var respObj = {
        "responseMessage": "Successfully registered.",
            "responseCode" : 200,
            "userProfile":{
                id:params
                }
            };

    return respObj;
}

function userExist(){
     var respObj = {
        "responseMessage": "Email already exist.",
            "responseCode" : 400           
            } ;
                return respObj;
}

function userNotExist(){
     var respObj = {
        "responseMessage": "Email doesn't exist.Please check your email and try again.",
            "responseCode" : 400           
            } ;
                return respObj;
}

function passwordMismatch(){
     var respObj = {
        "responseMessage": "Please check your password and try again.",
            "responseCode" : 400           
            } ;
          return respObj;
}
function loginMapping(params) {
    var respObj = {
        "responseMessage": "Successfully verified.",
        "accessToken": params.jwt,
        "userProfile": {
            "_id": params.user._id,
            "name": params.user.name,
            "email": params.user.email,
        }
    };
    return respObj;
}

function currentUser(details){
     var respObj = {
        "responseMessage": "Successfully authenticate.",
        "responseCode": 200,
        "userDetails": details
    };
    return respObj;
}

function roomCreated(details){
     var respObj = {
        "responseMessage": "Successfully Created Room.",
        "responseCode": 201,
        "roomId": details._id
    };
    return respObj;

}

function inValidToken(){
     var respObj = {
        "responseMessage": "Forbidden Access",
        "responseCode": 403
    };
    return respObj;
}

function messageSent(){
     var respObj = {
        "responseMessage": "Message Sent Successfully",
        "responseCode": 200
    };
    return respObj;
}

function requestSent(){
    var respObj = {
        "responseMessage": "Request Sent Successfully",
        "responseCode": 200
    };
    return respObj;
}

function alreadySentMessage(){
    var respObj ={
        "responseMessage":"Friend request is pending...",
        "responseCode" : 400
    };
    return respObj;
}

function searchedFriendsResponse(result){
    var respObj ={
        "responseMessage":"Search result",
        "responseCode" : 200,
        "data":result
    };
    return respObj;
}

function showNotification(result){
     var respObj ={
        "responseMessage":"Search result",
        "responseCode" : 200,
        "data":result
    };
    return respObj;
}

function acceptRejectFriendRequests(action){
    var respObj ={
        "responseMessage":`Successfully  ${action} friend request`,
        "responseCode" : 200
    };
    return respObj;
}

function dailyActivity(result){
    var respObj= {
         "responseMessage":"Success",
        "responseCode" : 200,
        result:result
    };

    return respObj;
}

function viewRooms(result){
    var respObj= {
         "responseMessage":"Success",
        "responseCode" : 200,
        result:result
    };

    return respObj;
}

function roomAlreadyExist(){
    var respObj= {
         "responseMessage":"Room already exist;",
        "responseCode" : 400
    };

    return respObj;
}

function viewChat(result){
    var respObj= {
         "responseMessage":"Success",
        "responseCode" : 200,
        result:result
    };

    return respObj;
}
module.exports = {
    registerMapping,
    userExist,
    loginMapping,
    passwordMismatch,
    userNotExist,
    currentUser,
    roomCreated,
    inValidToken,
    messageSent,
    requestSent,
    alreadySentMessage,
    searchedFriendsResponse,
    showNotification,
    acceptRejectFriendRequests,
    dailyActivity,
    viewRooms,
    roomAlreadyExist,
    viewChat
};