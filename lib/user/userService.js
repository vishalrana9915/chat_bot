'use strict';

//========================== Load Modules Start =======================
//========================== Load External modules ====================
const promise = require("bluebird");
var _ = require("lodash");
const async = require('async');
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
                return dailyUsers(data,"REGISTER");
             
                    });
                  }
              });
           }
        }) ;
    }


function dailyUsers(data,type){
       return userDao.incCountRegister(data.privileged,type)
       .then((count)=>{
        console.log("count"+JSON.stringify(count,null,3))
                    if(!count){
                       return userDao.incrementCount(data,type).then(counts=>userMapper.registerMapping(data._id));
                    }else{
                        var matchValue=[];
                        if(count.users.length>0){
                                for(var i=0;i<count.users.length;i++){
                                  if(JSON.stringify(count.users[i].userId) != JSON.stringify(data._id)){
                                    }else{
                                     matchValue.push(data._id);
                                    }
                                }

                                if(i >= count.users.length){
                                   if(matchValue.length>0){
                                   return userMapper.registerMapping(data._id);    
                                   }else{
                                        return userDao.updateCount(count._id,data).then((response)=>{
                                            return userMapper.registerMapping(data._id);
                                            })
                                     }
                                }
                        }else{
                           return userDao.updateCount(count._id,data).then((response)=>{
                                return userMapper.registerMapping(data._id);
                            })     

                        }
        
                    }
                    
                });
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

//this is only for private chat .Update according to requirement.

function createRoom(userDetails,roomDetails){
    
    return userDao.checkRoomExist(userDetails,roomDetails)
                .then((response)=>{
                    console.log(response)
                    if(response.length>0){
                        console.log("has room")
                        return ;
                    }else{
                        console.log("has not room")
                         return userDao.createRoom(roomDetails,userDetails)
                            .then((result)=>{
                                return result;
                            });
                    }
                })



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

function acceptRejectFriendRequests(userRequest,user){
        return userDao.acceptRejectFriendRequests(userRequest)
        .then(finalResult=> finalResult)
        .then((updateBoth)=>{
            if(userRequest.action != "REJECT"){
                return userDao.updateSenderReciever(userRequest.uuid,user.userId)
                .then(final=>final);
            }else{
                return updateBoth;
                }
           
        });      
       }


function dailyActivity(){
    return userDao.dailyActivity()
    .then((result)=>{
        var totalResult= result;
        var dailyAnalysisObject={};
       return totalResult.map((val,index)=>{
            if(val._id == "LOGIN"){
             dailyAnalysisObject.totalLoginToday = val.totalCounts;
                val.data.map((privilageCount,index)=>{
                    if(privilageCount.type == 0){
                         dailyAnalysisObject.totalUserLogin = privilageCount.counts;
                    }else if(privilageCount.type == 1){
                         dailyAnalysisObject.totalTrainerLogin = privilageCount.counts
                    }
                })

            }else if(val._id == "REGISTER"){
             dailyAnalysisObject.totalRegisterToday = val.totalCounts;
                val.data.map((privilageCount,index)=>{
                    if(privilageCount.type == 0){
                        dailyAnalysisObject.totalUserRegister = privilageCount.counts;
                    }else if(privilageCount.type == 1){
                         dailyAnalysisObject.totalTrainerRegister = privilageCount.counts
                    }
                })
            }

            if(index == totalResult.length-1){
        console.log("result==>"+JSON.stringify(dailyAnalysisObject))
                
                return dailyAnalysisObject;
            }
        })
    });
}


function viewRooms(userData){
        return userDao.viewRoom(userData.userId)
        .then(result=> result);
}

function viewAll(id){
        return userDao.viewAll(id)
        .then(result=> result);
}

function getChat(room) {
    return userDao.getChat(room)
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
    acceptRejectFriendRequests,
    dailyUsers,
    dailyActivity,
    viewRooms,
    viewAll,
    getChat
};

//========================== Export Module End ===============================
