module.exports = function(serve){
    var io = require('socket.io').listen(serve);

io.on('connection', function (socket) {
	socket.emit('hi',{name:"vishal"})
	console.log("connected.......");  
});

};