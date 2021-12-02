const app = require('express');
const http = require('http').createServer(app);
var io = require('socket.io')(http, {
	cors: {
		origin: '*',
		methods: [ 'GET', 'POST' ]
	}
});

io.on('connection', (socket) => {
	/* socket object may be used to send specific messages to the new connected client */
	console.log('new client connected');
	socket.emit('connection', null);
	socket.on('user_join', (name, room) => {
		this.username = name;
		console.log("name", name);
		console.log("room", room);
		socket.join(room)
		socket.broadcast.to(room).emit('user_join', {name, room});
	});

	socket.on("join_room", ({room}) => {
		socket.join(room);
	})

	socket.on('message', ({ name, message, room }) => {
		console.log(name, message, room);
		io.to(room).emit('message', { name, message, room });
	});

	socket.on('disconnect', () => {
		console.log('Disconnect Fired');
		//socket.broadcast.emit('user_leave', `${this.username} has left`);
	});
});

http.listen(4000, () => {
	console.log(`listening on *:${4000}`);
});
