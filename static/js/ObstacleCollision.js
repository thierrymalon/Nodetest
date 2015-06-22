///////////////////////////////////////////////////////////////////////////////
///////////////////////////// OBSTACLE COLLISION///////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// A visual spell can have different behaviours in the case of a collision with
// an obstacle: it can bounce, ignore by passing through, stop and loose its
// speed for the rest of its life, or be clocked but keep its speed.
// Here are all the possibilities.
///////////////////////////////////////////////////////////////////////////////

var ObstacleCollision = Object.freeze({
    // ignores and pass through the obstacle
    "IGNORE":1,
    // bounce on it
    "BOUNCE":2,
    // stop and cannot move later
    "STOP":3,
    // be blocked while changing direction
    "BLOCK":4
});
