module.exports = function(serve){
    var io = require('socket.io').listen(serve);

io.on('connection', function (socket) {
	let onlineUser = {};
	let currentUser={};
	socket.on('initChat',function(userData){
	console.log("socket connected.....");
	}) ;
});

};