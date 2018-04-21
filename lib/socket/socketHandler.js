const userDao = require('../user/userDao');
const userMapper = require('../user/userMapper');
const exception = require('../customExceptions');
const constants = require('./socketConstants');
const _ 		= require('lodash');

module.exports = function(serve){
    var io = require('socket.io').listen(serve);

io.on('connection', function (socket) {
	let onlineUser = {};
	let currentUser={};
	socket.on('initChat',function(data){
		console.log("socket created and user initialization...");
	return 	userDao.checkById(data)
	.then((result)=>{
		onlineUser[data] = socket.id
		// .push({
			// userData:data
		// })
		currentUser[result._id] = {socket:socket,userData:result,created:new Date()};
		socket.emit("initComplete","Socket intitialization completed.")
		// console.log(onlineUser)
		// console.log(currentUser)
	})
	});


	socket.on('sendMessage',(msgData)=>{

		if(msgData.roomId && msgData.message && msgData.messageType && msgData.recieverDetails.fullName &&  msgData.recieverDetails.recieverId){
			return userDao.sendMessage(msgData)
						.then((result)=>{
							console.log("message sent....");
							socket.emit('messageSentSuccess',constants.MESSAGES.SUCCESS);
							for(var i in onlineUser){
								if (i == msgData.recieverDetails.recieverId){
									currentUser[msgData.recieverDetails.recieverId].socket.Socket.id.emit('msgResponse',"Message sent sucessfully.")
								}
							}
								
							return ;
						})

		}else{
				return exception.getCustomErrorException(constants.MESSAGES.CUSTOM_EXCEPTION_ERROR,constants.CODE.ERROR)
			}

	});


socket.on('createRoom',(roomDetails)=>{
		if(roomDetails.chatType && roomDetails.members.length>1 ){
								

			return userDao.createRoom(roomDetails)
						.then((result)=>{
							console.log("Room created....");
							socket.emit('roomCreatedSuccess',constants.MESSAGES.SUCCESS);
							return ;
						})

		}else{
				return exception.getCustomErrorException(constants.MESSAGES.CUSTOM_EXCEPTION_ERROR,constants.CODE.ERROR)
			}

	});

// socket.on('viewAllFriends',function(userData){
// 	var usrData={
// 		userId:userData.userId
// 	}
// 	return userDao.search_friends(userData.keyword,usrData)
// 						.then((friendsDetails)=>{
// 							socket.emit('ListedFriends',friendsDetails);
// 							return ;
// 						})
// })

/*
*
*	Working on disconnect functionality need to see.
*
*/

 // socket.on('disconnect', function() {
 //      console.log('Got disconnect!');
 //      console.log(onlineUser)
 //      for(var i in onlineUser){
 //      	console.log(onlineUser[i])
 //      	if(onlineUser[i] == socket.id){
 //      		delete i;
 //      	}
 //      }
 //      console.log(onlineUser)
 //      // var i = allClients.indexOf(socket);
 //      // allClients.splice(i, 1);
 //   });

});


};