const userDao = require('../user/userDao');
const userMapper = require('../user/userMapper');
const exception = require('../customExceptions');
const constants = require('./socketConstants');
const _ 		= require('lodash');

module.exports = function(serve){
    var io = require('socket.io').listen(serve);
	let onlineUser = {};
	let currentUser={};
io.on('connection', function (socket) {

	socket.on('initChat',function(data){
		console.log(data);
		console.log("socket created and user initialization...");
	return 	userDao.checkById(data)
	.then((result)=>{
		onlineUser[data] = socket.id;
		currentUser[data] = {socket:socket,userData:result,created:new Date()};
		socket.emit("initComplete","Socket intitialization completed.");
		console.log(onlineUser);
	});
	});


	socket.on('sendMessage',(msgData)=>{
			console.log(msgData);
		if(msgData.details.roomId && msgData.details.message && msgData.details.messageType && msgData.details.recieverDetails.fullName &&  msgData.details.recieverDetails.recieverId){
			return userDao.sendMessage(msgData.sender,msgData.details)
						.then((result)=>{
							console.log("message sent....");
							socket.emit('messageSentSuccess',constants.MESSAGES.SUCCESS);
							console.log(onlineUser);
							for(var i in onlineUser){
								if (i == msgData.details.recieverDetails.recieverId){
									console.log("done==>"+currentUser[msgData.details.recieverDetails.recieverId].socket.id);
									socket.broadcast.to(currentUser[msgData.details.recieverDetails.recieverId].socket.id).emit('msgResponse', "msg");
									// io.socket.onlineUser[msgData.details.recieverDetails.recieverId].emit('msgResponse',"Message sent sucessfully.")
								}
							}
								socket.emit('msgSentSuccess',result);
							return ;
						});

		}else{
				return exception.getCustomErrorException(constants.MESSAGES.CUSTOM_EXCEPTION_ERROR,constants.CODE.ERROR);
			}

	});


socket.on('createRoom',(roomDetails)=>{
		if(roomDetails.chatType && roomDetails.members.length>1 ){
								

			return userDao.createRoom(roomDetails)
						.then((result)=>{
							console.log("Room created....");
							socket.emit('roomCreatedSuccess',constants.MESSAGES.SUCCESS);
							return ;
						});

		}else{
				return exception.getCustomErrorException(constants.MESSAGES.CUSTOM_EXCEPTION_ERROR,constants.CODE.ERROR);
			}

	});

socket.on('getChatting',function(roomId){
	return userDao.getChat(roomId)
						.then((friendsDetails)=>{
							socket.emit('allChat',friendsDetails);
							return ;
						});
});

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