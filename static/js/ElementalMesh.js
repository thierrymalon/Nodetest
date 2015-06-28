var ElementalMesh = function(elementalSphere, center, color, scene) {
    this.elementalSphere = elementalSphere;
//    var geometrySphere = new THREE.IcosahedronGeometry(elementalSphere.radius, 3);
    var geometrySphere = new THREE.SphereGeometry(elementalSphere.radius, 6, 6);
    for (var i = 0, j = geometrySphere.faces.length; i < j; i++) {
        geometrySphere.faces[i].color.setHex(color);
    }
    var materialSphere = new THREE.MeshPhongMaterial({
        vertexColors: THREE.FaceColors,
        shininess: 1000
    });
    this.mesh = new THREE.Mesh(geometrySphere, materialSphere);
    this.mesh.position.setX(center.x);
    this.mesh.position.setY(center.y);
    this.mesh.position.setZ(center.z);
    scene.add(this.mesh);
}

ElementalMesh.prototype.collidesSphere = function(elementalMesh) {
    return Tools.norm(Tools.diff(this.mesh.position, elementalMesh.mesh.position)) < this.elementalSphere.radius + elementalMesh.elementalSphere.radius;
}
