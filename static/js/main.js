// Disable scrolling
window.onscroll = function() { window.scrollTo(0, 0);};

(function() {

    var scene, camera, renderer;
    var geometry, material, mesh;
    var geometrySph, materialSph, meshSph;

    init();
    animate();

    function init() {

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 1000;

        geometry = new THREE.BoxGeometry( 200, 200, 200 );
        material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: false } );
        mesh = new THREE.Mesh( geometry, material );
//        scene.add( mesh );

        geometrySph = new THREE.IcosahedronGeometry( 120, 3 );
        for ( var i = 0, j = geometrySph.faces.length; i < j; i ++ ) {
            geometrySph.faces[i].color.setHex(0xff0000);
        }

        materialSph = new THREE.MeshPhongMaterial({
            vertexColors: THREE.FaceColors,
                    shininess: 100
        });
        meshSph = new THREE.Mesh( geometrySph, materialSph );
        scene.add( meshSph );

        var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
        light.position.set(-1,1,-1);
        scene.add(light);

        var groundTexture = THREE.ImageUtils.loadTexture("grasslight-big.jpg");
        groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
        groundTexture.repeat.set(25,25);
        groundTexture.anisotropy = 16;

        var groundMaterial = new THREE.MeshPhongMaterial({color:0xffffff, specular:0x111111, map:groundTexture});

        var meshGround = new THREE.Mesh(new THREE.PlaneBufferGeometry(20000,20000), groundMaterial);
        mesh.position.y = -250;
        mesh.rotation.x = -Math.PI/2;
        meshGround.receiveShadow = true;
        scene.add(meshGround);

        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );

        renderer.setPixelRatio( window.devicePixelRatio );

        document.body.appendChild( renderer.domElement );

    }

    function animate() {

//        requestAnimationFrame( animate );

//        mesh.rotation.x += 0.01;
//        mesh.rotation.y += 0.02;

        renderer.render( scene, camera );

    }

})();
