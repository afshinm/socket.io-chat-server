var io = require('socket.io').listen(3000);

var buffer = [];
io.sockets.on('connection', function(client) {
    client.emit('history', { buffer: buffer });
    io.sockets.emit('announcement', client.id + ' connected');

    client.on('message', function(message){
        var msg = { message: [client.id, message] };
        buffer.push(msg);
        if (buffer.length > 15) buffer.shift();
        io.sockets.emit('message', msg);
    });

    client.on('disconnect', function(){
        io.sockets.emit('announcement', client.id + ' disconnected');
    });
});