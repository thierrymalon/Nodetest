///////////////////////////////////////////////////////////////////////////////
///////////////////////////// HEAL HURT ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// A visual spell can have different behaviours in the case of a collision with
// an ally or with an ennemy: it can ignore, heal or heal. Here are all the
// possible combinaisons to code it with a simple number.
///////////////////////////////////////////////////////////////////////////////

var HealHurt = Object.freeze({
    // ignores ally, ignores ennemy
    "IGNO_ALLY_IGNO_ENNEMY":1,
    // heals ally, ignores ennemy
    "HEAL_ALLY_IGNO_ENNEMY":2,
    // hurts ally, ignores ennemy
    "HURT_ALLY_IGNO_ENNEMY":3,
    // ignores ally, heals ennemy
    "IGNO_ALLY_HEAL_ENNEMY":4,
    // heals ally, heals ennemy
    "HEAL_ALLY_HEAL_ENNEMY":5,
    // hurts ally, heals ennemy
    "HURT_ALLY_HEAL_ENNEMY":6,
    // ignores ally, hurts ennemy
    "IGNO_ALLY_HURT_ENNEMY":7,
    // heals ally, hurts ennemy
    "HEAL_ALLY_HURT_ENNEMY":8,
    // hurts ally, hurts ennemy
    "HURT_ALLY_HURT_ENNEMY":9
});
