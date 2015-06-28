(function() {
var Client = function() {
    this.socket = io();

//    console.log("Connected");

    var scene, camera, renderer, perso, persos, carte, visualSpells;

    var self = this;
    this.socket.on("msg", function(msg, msg2, msg3, msg4, msg5, msg6, msg7, msg8) {
        self.socket.emit("toto", "I received your stuff !");
        // Disable scrolling
        window.onscroll = function() { window.scrollTo(0, 0);};


        init(msg, self.socket, msg2, msg3, msg4, msg5, msg6, msg7, msg8);
        animate();

    });

    function init(id, socket, colorPerso, xp, yp, connectes, xs, ys, colorsPerso) {

    carte = new Map();
    carte.generateTest1();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.rotation.x = 0.2;
    camera.position.x = 250;
    camera.position.y = -60+250;
    camera.position.z = 1350;

    var unmeshSpells = new Array(100);

    visualSpells = new Array(50);

    for (var i = 0; i < 500; i++) {
        var sortBasique = new UnmeshSpell(new ElementalSphere(Element.FEU, 10),0,6,new Movement(1300,0,0,0,0,0,0,0),HealHurt.IGNO_ALLY_HURT_ENNEMY,ObstacleCollision.BLOCK,new Array, new Array, new Array, new Array, 600000);
        visualSpells[i] = new VisualSpell(false,0,sortBasique,new THREE.Vector3(0,0,16),0x000000,scene);
    }

    var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    light.position.set(-1,1,-1);
    scene.add(light);

    var elementalSpherePerso = new ElementalSphere(Element.FEU, 16);
    var meshPerso = new ElementalMesh(elementalSpherePerso, new THREE.Vector3(0,0,16), colorPerso, scene);

    perso = new Personnage(true, id, meshPerso, 0, 1, 0, 50, 50, 0, 0, 5.0, 0);
    perso.sphere.mesh.position.set( xp, yp, 0 );

    persos = new Array(50);
    for (var i = 0; i < 50; i++) {
        var elementalSphereOther = new ElementalSphere(Element.FEU, 16);
        var meshOther = new ElementalMesh(elementalSphereOther, new THREE.Vector3(0,0,16), colorsPerso[i], scene);
        persos[i] = new Personnage(false, id, meshOther, 0, 1, 0, 50, 50, 0, 0, 5.0, 0);
        persos[i].isConnected = connectes[i];
        persos[i].lastMove = new Lifetime(1);
        persos[i].lastShoot = new Lifetime(1);

        if (connectes[i]) {
            persos[i].sphere.mesh.position.set( xs[i], ys[i], 0 );
        }
//        persos[i].sphere.mesh.position.set( 340, 340);
    }

    var floorTexture = new THREE.ImageUtils.loadTexture( '/static/textures/TextureMetal.png' );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set( 24, 24 );
    var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
    var floorGeometry = new THREE.PlaneGeometry(1800, 1800);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.x = 900;
    floor.position.y = 900;
    //        floor.rotation.x = Math.PI / 2;
    scene.add(floor);

    for (var i = 0; i < carte.height; i++) {
        for (var j = 0; j < carte.width; j++) {
            if (carte.cases.get(i,j) == Tile.OBSTACLE)
            {
                var cubeGeometry = new THREE.BoxGeometry( 100, 100, 100 );
                var crateTexture = new THREE.ImageUtils.loadTexture( '/static/textures/Caisse.gif' );
                var crateMaterial = new THREE.MeshBasicMaterial( { map: crateTexture } );
                var crate = new THREE.Mesh( cubeGeometry.clone(), crateMaterial );
                crate.position.set(50+100*j, 50+100*i, 50);
                scene.add( crate );
            }
        }
    }

    //        var map = new Map();
    //        map.generateTest1();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
    document.body.appendChild( renderer.domElement );

    }

    function animate() {

        requestAnimationFrame( animate );

        if (perso.toMove) {
            self.socket.emit("move", perso.id, perso.sphere.mesh.position.x, perso.sphere.mesh.position.y, perso.motion.direction());
            perso.toMove = false;
        }

        if (perso.toShoot) {
            self.socket.emit("shoot", perso.id, perso.sphere.mesh.position.x, perso.sphere.mesh.position.y, perso.direction);
            perso.toShoot = false;
            perso.cooldown = new Lifetime(500);
        }

    //        mesh.rotation.x += 0.01;
    //        mesh.rotation.y += 0.02;

        self.socket.on("deco", function(id) {
            persos[id].isConnected = false;
            persos[id].sphere.mesh.position.set( 0, 0, -100 );
        });

        self.socket.on("other", function(id, x, y, color) {
            if (!persos[id].isConnected) {
                var elementalSphereOther = new ElementalSphere(Element.FEU, 16);
                var meshOther = new ElementalMesh(elementalSphereOther, new THREE.Vector3(0,0,16), color, scene);
                persos[id] = new Personnage(false, id, meshOther, 0, 1, 0, 50, 50, 0, 0, 5.0, 0);
                persos[id].isConnected = true;
                persos[id].sphere.mesh.position.set( x, y, 0 );
            }
        });

        self.socket.on("move", function(id, x, y, direction) {
            if (persos[id].lastMove.lifeEnds()) {
                persos[id].lastMove = new Lifetime(3);
                persos[id].sphere.mesh.position.set( x, y, 0 );
                persos[id].direction = direction;
                persos[id].motion.setDirection(direction);
            }
        });

        self.socket.on("shoot", function(id, x, y, direction, kk) {
            if (persos[id].lastShoot.lifeEnds()) {
                persos[id].lastShoot = new Lifetime(10);
                visualSpells[kk].exists = true;
                visualSpells[kk].idOwner = id;
                visualSpells[kk].stillEffective = true;
                visualSpells[kk].elementalMesh.mesh.position.setX(x);
                visualSpells[kk].elementalMesh.mesh.position.setY(y);
                visualSpells[kk].unmeshSpell.movement.theta = direction*Math.PI/16;
                visualSpells[kk].lifeTime = new Lifetime(1000);
            }
        });

        perso.nextStep(camera, carte);
        for (var i = 0; i < 50; i++) {
            if (persos[i].isConnected) {
                persos[i].nextStep(camera, carte);
            }
        }

        for (var i = 0; i < 500; i++) {
            if (visualSpells[i].exists) {
                if (visualSpells[i].lifeTime.lifeEnds()) {
                    visualSpells[i].exists = false;
                    visualSpells[i].elementalMesh.mesh.position.setX(0);
                    visualSpells[i].elementalMesh.mesh.position.setY(0);
                }
                else {
                    var nextPos = Tools.sum(visualSpells[i].elementalMesh.mesh.position,Tools.mul(new THREE.Vector3(Math.cos(visualSpells[i].unmeshSpell.movement.theta), Math.sin(visualSpells[i].unmeshSpell.movement.theta), 0.0),visualSpells[i].unmeshSpell.movement.speed/100.0));
                    visualSpells[i].elementalMesh.mesh.position.setX(nextPos.x);
                    visualSpells[i].elementalMesh.mesh.position.setY(nextPos.y);
                }
            }
        }

        renderer.render( scene, camera );
    }
}

var client = new Client();
})();
