module.exports = function(io) {
    var id = 1;
    var NB_MAX = 100;
    var connectes = new Array(NB_MAX);
    var socketIds = new Array(NB_MAX);
    var persos = new Array(NB_MAX);

    for (var i = 0; i < NB_MAX; i++) {
        connectes[i] = false;
    }
    io.on('connection', function(socket) {
        console.log("Client arrived");
        console.log("Socket ID is " + socket.id);

        socket.emit("msg", "Hello your ID is ", id, connectes);
        socket.broadcast.emit("other", id);
        socketIds[id] = socket.id;
        connectes[id] = true;
        id = id+1;

        socket.on("toto", function(answer) {
            console.log(answer);
        });

        socket.on("disconnect", function() {
            console.log("Client left");
            console.log("Socket ID was " + socket.id);
            var found = false;
            var pos = 0;
            while (!found && pos < NB_MAX) {
                if (connectes[pos]) {
                    if (socketIds[pos] == socket.id) {
                        socket.broadcast.emit("deco", pos);
                        found = true;
                        connectes[pos] = false;
                    }
                }
                pos = pos+1;
            }
        });

        socket.on("move", function(id, x, y, direction) {
        socket.broadcast.emit("move", id, x, y, direction);
        });
    });
}
