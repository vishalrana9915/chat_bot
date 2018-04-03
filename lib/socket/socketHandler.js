const userDao = require('../user/userDao');
const userMapper = require('../user/userMapper');
const exception = require('../customExceptions');
const constants = require('./socketConstants')



module.exports = function(serve){
    var io = require('socket.io').listen(serve);

io.on('connection', function (socket) {
	let onlineUser = [];
	let currentUser={};
	socket.on('initChat',function(data){
		console.log("socket created and user initialization...");
		onlineUser.push({
			userData:data
		})
		currentUser[data.userId] = {socket:socket,userData:data,created:new Date()};
		socket.emit("initComplete","Socket intitialization completed.")
	});


	socket.on('sendMessage',(msgData)=>{

		if(msgData.roomId && msgData.message && msgData.messageType && msgData.recieverDetails.fullName &&  msgData.recieverDetails.recieverId){
			return userDao.sendMessage(msgData)
						.then((result)=>{
							console.log("message sent....");
							socket.emit('messageSentSuccess',constants.MESSAGES.SUCCESS);
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




});


};