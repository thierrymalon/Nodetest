var Personnage = function(isPlayer, id, elementalMesh, direction, niveau, exp, pdvMax, pdvRestants, puissance, resistance, vitesse, sorts, socket)
{
    this.isConnected = isPlayer;
    this.isPlayer = isPlayer;
    this.id = id;
    this.sphere = elementalMesh;
    this.direction = direction;
    this.etat = 0;
    this.niveau = niveau;
    this.exp = exp;
    this.pdvMax = pdvMax;
    this.pdvRestants = pdvRestants;
    this.puissance = puissance;
    this.resistance = resistance;
    this.vitesse = vitesse;
    this.sorts = sorts;
    this.socket = socket;

    this.motion = new Motion();
    this.moving = false;

    var self = this;
    var onKeyDown = function(event) {self.onKeyDown(event);};
    var onKeyUp = function(event) {self.onKeyUp(event);};

    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
}

Personnage.prototype.changeSort = function(sort,idxSort) {
    this.sorts[idxSort] = sort;
}

Personnage.prototype.onKeyEvent = function(event, toSet) {
    var currentDirection = this.motion.direction();
    switch (event.keyCode) {
        // Azerty keyboards
        case 38: this.motion.moveUp    = toSet; break; // Up
        case 37: this.motion.moveLeft  = toSet; break; // Left
        case 40: this.motion.moveDown  = toSet; break; // Down
        case 39: this.motion.moveRight = toSet; break; // Right

        case 65: this.action.keyA = toSet; break; // A key pressed
    }
    if (currentDirection != this.motion.direction())
    {
        console.log("change direction : " + currentDirection + " to " + this.motion.direction());
        this.socket.emit("move", this.id, this.sphere.mesh.position.x, this.sphere.mesh.position.y, this.motion.direction());
    }
}

Personnage.prototype.onKeyDown = function(event) {
    if (this.isPlayer) {
        this.onKeyEvent(event, true);
    }
}

Personnage.prototype.onKeyUp = function(event) {
    if (this.isPlayer) {
        this.onKeyEvent(event, false);
    }
}

Personnage.prototype.nextStep = function(camera, map) {
    var nextMove = new THREE.Vector3(0, 0, 0);
    if (this.motion.moveUp) {
       nextMove = Tools.sum(nextMove, new THREE.Vector3(0, 1, 0));
    }
    if (this.motion.moveDown) {
       nextMove = Tools.sum(nextMove, new THREE.Vector3(0, -1, 0));
    }
    if (this.motion.moveRight) {
       nextMove = Tools.sum(nextMove, new THREE.Vector3(1, 0, 0));
    }
    if (this.motion.moveLeft) {
       nextMove = Tools.sum(nextMove, new THREE.Vector3(-1, 0, 0));
    }

    if (nextMove.x > 0 && nextMove.y == 0) {
        this.direction = 0;
    }
    else if (nextMove.x > 0 && nextMove.y > 0) {
        this.direction = 4;
    }
    else if (nextMove.x == 0 && nextMove.y > 0) {
        this.direction = 8;
    }
    else if (nextMove.x < 0 && nextMove.y > 0) {
        this.direction = 12;
    }
    else if (nextMove.x < 0 && nextMove.y == 0) {
        this.direction = 16;
    }
    else if (nextMove.x < 0 && nextMove.y < 0) {
        this.direction = 20;
    }
    else if (nextMove.x == 0 && nextMove.y < 0) {
        this.direction = 24;
    }
    else if (nextMove.x > 0 && nextMove.y < 0) {
        this.direction = 28;
    }

    if (nextMove.x == 0 && nextMove.y == 0) {
        this.moving = false;
    }

    var nextMoveNorm = Tools.norm2(nextMove);
    if (nextMoveNorm > 0) {
        var nextMoveNorme = Tools.mul(nextMove, this.vitesse/Tools.norm(nextMove));
        var nextPosition = Tools.sum(this.sphere.mesh.position, nextMoveNorme);
        // Gérer la collision avec obstacle ici
//        this.sphere.elementalSphere.center = nextPosition;
        this.sphere.mesh.position.set(nextPosition.x,nextPosition.y,nextPosition.z);
        var vectorBack = new THREE.Vector3(1,0,0);
        var axis = new THREE.Vector3(0,0,1);
        var angle = Math.PI/4;

        for (i = 0; i < 8; i++) {
            var sphereBordure = Tools.sum(nextPosition, Tools.mul(vectorBack, this.sphere.elementalSphere.radius));
            while (map.cases.get(Math.floor(sphereBordure.y/100), Math.floor(sphereBordure.x/100)) == Tile.OBSTACLE) {
                nextPosition = Tools.sum(this.sphere.mesh.position, Tools.mul(vectorBack,-1));
                this.sphere.mesh.position.set(nextPosition.x,nextPosition.y,nextPosition.z);
                sphereBordure = Tools.sum(nextPosition, Tools.mul(vectorBack, this.sphere.elementalSphere.radius));
            }
            if (i < 7) {
                vectorBack.applyAxisAngle(axis,angle);
            }
        }

        if (this.isPlayer) {
            camera.position.x = nextPosition.x;
            camera.position.y = nextPosition.y-60;
            camera.position.z = nextPosition.z+350;
        }
//        camera.lookAt(nextPosition.x, nextPosition.y+20, nextPosition.z);
    }
}
