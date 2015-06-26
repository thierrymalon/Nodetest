var Client = function() {
    this.socket = io();

    console.log("Connected");

    var self = this;
    this.socket.on("msg", function(msg, msg2, msg3) {
        console.log("msg received : " + msg + " " + msg2);
        self.socket.emit("toto", "I received your stuff !");
        // Disable scrolling
        window.onscroll = function() { window.scrollTo(0, 0);};

        var scene, camera, renderer, perso, persos, carte;

        init(msg2, self.socket, msg3);
        animate();

    });


    function init(id, socket, connectes) {

    carte = new Map();
    carte.generateTest1();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.rotation.x = 0.2;
    camera.position.x = 250;
    camera.position.y = -60+250;
    camera.position.z = 1350;

    var unmeshSpells = new Array(100);

    //        var visualSpells = new Array(10000);

    //        for (var i = 0; i < 10000; i++) {
    //            visualSpells[i] = new VisualSpell();
    //        }

    var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    light.position.set(-1,1,-1);
    scene.add(light);

    var elementalSpherePerso = new ElementalSphere(Element.FEU, 16);
    var meshPerso = new ElementalMesh(elementalSpherePerso, new THREE.Vector3(0,0,16), 0xff0000, scene);

    perso = new Personnage(true, id, meshPerso, 0, 1, 0, 50, 50, 0, 0, 5.0, 0, socket);
    perso.sphere.mesh.position.set( 250, 250, 0 );

    persos = new Array(100);
    for (var i = 0; i < 100; i++) {
        var elementalSphereOther = new ElementalSphere(Element.FEU, 16);
        var meshOther = new ElementalMesh(elementalSphereOther, new THREE.Vector3(0,0,16), 0xff0000, scene);
        persos[i] = new Personnage(false, id, meshOther, 0, 1, 0, 50, 50, 0, 0, 5.0, 0);
        persos[i].isConnected = connectes[i];
        if (connectes[i]) {
            persos[i].sphere.mesh.position.set( 250, 250, 0 );
        }
        persos[i].sphere.mesh.position.set( 340, 340);
    }

    var floorTexture = new THREE.ImageUtils.loadTexture( '/static/textures/TextureMetal.png' );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set( 24, 24 );
    var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
    var floorGeometry = new THREE.PlaneGeometry(1600, 1600);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.x = 800
    floor.position.y = 800;
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

    //        mesh.rotation.x += 0.01;
    //        mesh.rotation.y += 0.02;

        perso.socket.on("deco", function(id) {
            persos[id].isConnected = false;
            persos[id].sphere.mesh.position.set( 0, 0, -100 );
        });

        perso.socket.on("other", function(id) {
            persos[id].isConnected = true;
            persos[id].sphere.mesh.position.set( 250, 250, 0 );
        });

        perso.socket.on("move", function(id, x, y, direction) {
            persos[id].sphere.mesh.position.set( x, y, 0 );
            persos[id].direction = direction;
            persos[id].motion.setDirection(direction);
        });

        perso.nextStep(camera, carte);
        for (var i = 0; i < 100; i++) {
            if (persos[i].isConnected) {
                persos[i].nextStep(camera, carte);
            }
        }

        renderer.render( scene, camera );
    }
}
