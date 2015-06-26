var Motion = function() {
    this.moveUp = false;
    this.moveDown = false;
    this.moveRight = false;
    this.moveLeft = false;
}

Motion.prototype.direction = function() {
    return this.moveRight + 2*this.moveUp + 4*this.moveLeft + 8*this.moveDown;
}

Motion.prototype.setDirection = function(direction) {
    this.moveDown  = (direction >= 8);
    this.moveRight = (direction % 2 == 1);
    this.moveUp    = (direction % 4 >= 2);
    this.moveLeft  = (direction % 8 >= 4);
}
