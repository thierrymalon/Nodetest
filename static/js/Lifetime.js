///////////////////////////////////////////////////////////////////////////////
///////////////////////////// LIFE TIME ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// Some entities die and disappear after a certain amount of time.
///////////////////////////////////////////////////////////////////////////////
// dateOfBirth:
//      Indicates the date of creation, which is the number of seconds since
//      the 1st january 1970.
// timeToLive:
//      Indicates the number of microseconds that the entity should live before
//      dying.
///////////////////////////////////////////////////////////////////////////////

var Lifetime = function(timeToLive) {
    this.dateOfBirth = Date.getTime();
    this.timeToLive = timeToLive;
    this.alive = true;
}

Lifetime.prototype.timeLived = function() {
    return Date.getTime()-this.dateOfBirth;
}

Lifetime.prototype.lifeEnds = function() {
    return Date.getTime()-this.dateOfBirth >= this.timeToLive;
}
