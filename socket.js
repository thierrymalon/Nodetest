module.exports = function(io) {
    var id = 1;
    var NB_MAX = 50;
    var connectes = new Array(NB_MAX);
    var socketIds = new Array(NB_MAX);
    var persos = new Array(NB_MAX);

    for (var i = 0; i < NB_MAX; i++) {
        connectes[i] = false;
    }

    io.on('connection', function(socket) {
        console.log("ID = " + id);
        console.log("Client arrived");
        var turn = false;
        while (id <= 50 && connectes[id]) {
            console.log("ID = " + id);
            id = id+1;
            if (id > 50 && !turn) {
                console.log("ID = " + id);
                id = 1;
                console.log("ID = " + id);
                turn = true;
            }
        }
        if (id > 50 || id < 0) {
            console.log("ID = " + id);
            id = 1;
        }
        else {

            console.log("ID = " + id);

            console.log("Socket ID is " + id + " / " + socket.id + " IPAddress: " + socket.handshake.address);

            socket.emit("msg", "Hello your ID is ", id, connectes);
            socket.broadcast.emit("other", id);
            socketIds[id] = socket.id;
            connectes[id] = true;
        }

        socket.on("toto", function(answer) {
            console.log(answer);
        });

        socket.on("disconnect", function() {
            console.log("Client left");
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
                if (!found) {
                    pos = pos+1;
                }
            }
            console.log("Socket ID was " + pos + " / " + socket.id + " IPAddress: " + socket.handshake.address);
        });

        socket.on("move", function(id, x, y, direction) {
            socket.broadcast.emit("move", id, x, y, direction);
        });
    });
}
