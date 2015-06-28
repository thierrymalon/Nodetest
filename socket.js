module.exports = function(io) {

    var Matrix = function(height, width){
        this.height = height;
        this.width = width;
        this.data = new Array(height, width);
    }

    Matrix.prototype.get = function(i,j) {
        return this.data[i*this.width+j];
    }

    Matrix.prototype.set = function(i,j,value) {
        this.data[i*this.width+j] = value;
    }

    var Map = function() {
        this.height = 18;
        this.width = 18;
        this.cases = new Matrix(this.height, this.width);
        for (var i=0; i<this.height; i++){
            for (var j=0; j<this.width; j++){
                this.cases.set(i,j,false)
            }
        }
    }

    Map.prototype.generateTest1 = function(){
        for (var i=0; i<this.height; i++){
            this.cases.set(i,0,true);
            this.cases.set(i,this.width,true);
        }
        for (var j=0; j<this.width;j++){
            this.cases.set(0,j,true);
            this.cases.set(this.height,j,true);
        }
        this.cases.set(1,1,true);
        this.cases.set(8,1,true);
        this.cases.set(16,1,true);
        this.cases.set(4,2,true);
        this.cases.set(8,2,true);
        this.cases.set(12,2,true);
        this.cases.set(13,2,true);
        this.cases.set(4,3,true);
        this.cases.set(13,3,true);
        this.cases.set(10,4,true);
        this.cases.set(15,4,true);
        this.cases.set(2,5,true);
        this.cases.set(3,5,true);
        this.cases.set(6,5,true);
        this.cases.set(7,5,true);
        this.cases.set(6,6,true);
        this.cases.set(11,6,true);
        this.cases.set(1,7,true);
        this.cases.set(9,7,true);
        this.cases.set(14,7,true);
        this.cases.set(5,8,true);
        this.cases.set(9,8,true);
        this.cases.set(16,8,true);
        this.cases.set(2,9,true);
        this.cases.set(3,9,true);
        this.cases.set(5,9,true);
        this.cases.set(6,9,true);
        this.cases.set(12,9,true);
        this.cases.set(13,9,true);
        this.cases.set(15,9,true);
        this.cases.set(16,9,true);
        this.cases.set(8,10,true);
        this.cases.set(8,11,true);
        this.cases.set(11,11,true);
        this.cases.set(1,12,true);
        this.cases.set(8,12,true);
        this.cases.set(13,12,true);
        this.cases.set(14,12,true);
        this.cases.set(10,13,true);
        this.cases.set(13,13,true);
        this.cases.set(16,13,true);
        this.cases.set(3,14,true);
        this.cases.set(9,14,true);
        this.cases.set(10,14,true);
        this.cases.set(6,15,true);
        this.cases.set(1,16,true);
        this.cases.set(6,16,true);
        this.cases.set(15,16,true);
        this.cases.set(16,16,true);
    }

    function getRandomColor() {
        var letters = '0123456789abcdef'.split('');
        var color = '0x';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random()*16)];
        }
        return color;
    }

    var map = new Map();
    map.generateTest1();
    var kk = 0;
    var id = 1;
    var NB_MAX = 50;
    var NB_VISU = 500;
    var connectes = new Array(NB_MAX);
    var socketIds = new Array(NB_MAX);
    var xs = new Array(NB_MAX);
    var ys = new Array(NB_MAX);
    var colors = new Array(NB_MAX);
    var sortsId = new Array(NB_VISU);
    var xss = new Array(NB_VISU);
    var yss = new Array(NB_VISU);
    var directions = new Array(NB_VISU);

    for (var i = 0; i < NB_MAX; i++) {
        connectes[i] = false;
        xs[i] = 0;
        ys[i] = 0;
        colors[i] = 0xff0000;
    }

    for (var i = 0; i < NB_VISU; i++) {
        sortsId[i] = 0;
        xss[i] = 0;
        yss[i] = 0;
        directions[i] = 0;
    }

    io.on('connection', function(socket) {
        console.log("Client arrived");
        var turn = false;
        while (id <= 50 && connectes[id]) {
            id = id+1;
            if (id > 50 && !turn) {
                id = 1;
                turn = true;
            }
        }
        if (id > 50 || id < 0) {
            id = 1;
        }
        else {

            var colorPerso = getRandomColor();
            var xp = 0;
            var yp = 0;

            while (map.cases.get(yp,xp)) {
                xp = 1+Math.round(Math.random()*15);
                yp = 1+Math.round(Math.random()*15);
            }

            xp = 100*xp+50;
            yp = 100*yp+50;



            socket.emit("msg", id, colorPerso, xp, yp, connectes, xs, ys, colors);
            socket.broadcast.emit("other", id, xp, yp, colorPerso);
            xs[id] = xp;
            ys[id] = yp;
            colors[id] = colorPerso;
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
            xs[id] = x;
            ys[id] = y;
        });

        socket.on("shoot", function(id, x, y, direction) {
            socket.emit("shoot", id, x, y, direction, kk);
            socket.broadcast.emit("shoot", id, x, y, direction, kk);
            sortsId[kk] = id;
            xss[kk] = x;
            yss[kk] = y;
            directions[kk] = direction;
            kk = (kk+1)%500;
        });

    });
}
