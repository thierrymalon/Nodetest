var evenementBoomerang = new Evenement(
    new EvenementType.THETA,
    MATH.PI,
    500000
);

var evenementVitesse = new Evenement(
    new EvenementType.SPEED,
    2000,
    500000
);

var evenementAngleDroitHoraire = new Evenement(
    new EvenementType.THETA,
    3.0*MATH.PI/2.0,
    200000
);

var evenementAngleDroitTrigo = new Evenement(
    new EvenementType.THETA,
    MATH.PI/2.0,
    200000
);

var evenementAngleDroitTrigoEau = new Evenement(
    new EvenementType.THETA,
    MATH.PI/2.0,
    1200000
);

var evenementVitesseEau = new Evenement(
    new EvenementType.SPEED,
    800,
    800000
);

var evenementAccelerationEau = new Evenement(
    new EvenementType.ACCELERATION,
    10,
    800000
);

var evenementVitesseRotationEau = new Evenement(
    new EvenementType.THETA_SPEED,
    200,
    800000
);

var evenementAccelerationAngulaire = new Evenement(
    new EvenementType.THETA_ACCELERATION,
    3,
    800000
);

// Evenements tranch'herbes
var evenementChangeAngle0 = new Evenement(
    new EvenementType.THETA,
    0,
    400000
);

var evenementChangeAngle4 = new Evenement(
    new EvenementType.THETA,
    MATH.PI/4.0,
    400000
);

var evenementChangeAngle8 = new Evenement(
    new EvenementType.THETA,
    2*MATH.PI/4.0,
    400000
);

var evenementChangeAngle12 = new Evenement(
    new EvenementType.THETA,
    3*MATH.PI/4.0,
    400000
);

var evenementChangeAngle16 = new Evenement(
    new EvenementType.THETA,
    MATH.PI,
    400000
);

var evenementChangeAngle20 = new Evenement(
    new EvenementType.THETA,
    5*MATH.PI/4.0,
    400000
);

var evenementChangeAngle24 = new Evenement(
    new EvenementType.THETA,
    6*MATH.PI/4.0,
    400000
);

var evenementChangeAngle28 = new Evenement(
    new EvenementType.THETA,
    7*MATH.PI/4.0,
    400000
);

var evenementChangementAcceleration = new Evenement(
    new EvenementType.ACCELERATION,
    20,
    400000
);
