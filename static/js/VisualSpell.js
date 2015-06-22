var VisualSpell = function(exists, idOwner, unmeshSpell, initialPos, color, scene) {
    this.exists = exists;
    this.idOwner = idOwner;
    this.stillEffective = true;
    this.unmeshSpell = unmeshSpell;
    this.elementalMesh = new ElementalMesh(unmeshSpell.elementalSphere, initialPos, color, scene);
    this.lifeTime = new Lifetime(unmeshSpell.timeToLive);
};

VisualSpell.protoype.nextStep = function() {
    for (var i = 0; i < this.unmeshSpell.events.length; i++) {
        if (this.unmeshSpell.events[i].time.alive && this.unmeshSpell.events[i].time.lifeEnds()) {
            this.unmeshSpell.events[i].time.alive = false;
            var valueEvent = this.unmeshSpell.events[i].value;
            switch (this.unmeshSpell.events[i].evenementType) {
                case EvenementType.JUMP:
//TODO                    this.elementalMesh.mesh.position
                    break;
                case EvenementType.SPEED:
                    this.unmeshSpell.movement.speed = valueEvent;
                    break;
                case EvenementType.ACCELERATION:
                    this.unmeshSpell.movement.acceleration = valueEvent;
                    break;
                case EvenementType.THETA:
                    this.unmeshSpell.movement.theta = valueEvent;
                    break;
                case EvenementType.THETA_SPEED:
                    this.unmeshSpell.movement.thetaRotationSpeed = valueEvent;
                    break;
                case EvenementType.THETA_ACCELERATION:
                    this.unmeshSpell.movement.thetaAngularAcceleration = valueEvent;
                    break;
                case EvenementType.PHI:
                    this.unmeshSpell.movement.phi = valueEvent;
                    break;
                case EvenementType.PHI_SPEED:
                    this.unmeshSpell.movement.phiRotationSpeed = valueEvent;
                    break;
                case EvenementType.PHI_ACCELERATION:
                    this.unmeshSpell.movement.phiAngularAcceleration = valueEvent;
                    break;
                case EvenementType.SIZE:
                    this.unmeshSpell.elementalSphere.radius = valueEvent;
                    //TODO
                    break;
                case EvenementType.POWER:
                    this.unmeshSpell.power = valueEvent;
                    break;
            }
        }
    }

    this.unmeshSpell.movement.speed += this.unmeshSpell.movement.acceleration;
    this.unmeshSpell.movement.thetaRotationSpeed += this.unmeshSpell.movement.thetaAngularAcceleration;
    this.unmeshSpell.movement.theta += this.unmeshSpell.movement.thetaRotationSpeed/10000.0;
    this.unmeshSpell.movement.phiRotationSpeed += this.unmeshSpell.movement.phiAngularAcceleration;
    this.unmeshSpell.movement.phi += this.unmeshSpell.movement.phiRotationSpeed/10000.0;

    var nextPosition = Tools.sum(this.elementalMesh.mesh.position, Tools.mul(this.unmeshSpell.movement.speed/100.0), new THREE.Vector3(Math.cos(this.unmeshSpell.movement.theta), Math.sin(this.unmeshSpell.movement.phi, 0.0));
}
