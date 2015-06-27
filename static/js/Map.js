var Map = function() {
    this.height = 18;
    this.width = 18;
    this.cases = new Matrix(this.height,this.width);
    for (var i = 0; i<this.height; i++) {
        for (var j = 0; j<this.width; j++) {
            this.cases.set(i,j,Tile.GROUND);
        }
    }
}

Map.prototype.generateTest1 = function() {
    for (var i = 0; i<this.height; i++) {
        this.cases.set(i,0,Tile.OBSTACLE);
        this.cases.set(i,this.width-1,Tile.OBSTACLE);
    }
    for (var j = 0; j<this.width; j++) {
        this.cases.set(0,j,Tile.OBSTACLE);
        this.cases.set(this.height-1,j,Tile.OBSTACLE);
    }
    this.cases.set(1,1,Tile.OBSTACLE);
    this.cases.set(8,1,Tile.OBSTACLE);
    this.cases.set(16,1,Tile.OBSTACLE);
    this.cases.set(4,2,Tile.OBSTACLE);
    this.cases.set(8,2,Tile.OBSTACLE);
    this.cases.set(12,2,Tile.OBSTACLE);
    this.cases.set(13,2,Tile.OBSTACLE);
    this.cases.set(4,3,Tile.OBSTACLE);
    this.cases.set(13,3,Tile.OBSTACLE);
    this.cases.set(10,4,Tile.OBSTACLE);
    this.cases.set(15,4,Tile.OBSTACLE);
    this.cases.set(2,5,Tile.OBSTACLE);
    this.cases.set(3,5,Tile.OBSTACLE);
    this.cases.set(6,5,Tile.OBSTACLE);
    this.cases.set(7,5,Tile.OBSTACLE);
    this.cases.set(6,6,Tile.OBSTACLE);
    this.cases.set(11,6,Tile.OBSTACLE);
    this.cases.set(1,7,Tile.OBSTACLE);
    this.cases.set(9,7,Tile.OBSTACLE);
    this.cases.set(14,7,Tile.OBSTACLE);
    this.cases.set(5,8,Tile.OBSTACLE);
    this.cases.set(9,8,Tile.OBSTACLE);
    this.cases.set(16,8,Tile.OBSTACLE);
    this.cases.set(2,9,Tile.OBSTACLE);
    this.cases.set(3,9,Tile.OBSTACLE);
    this.cases.set(5,9,Tile.OBSTACLE);
    this.cases.set(6,9,Tile.OBSTACLE);
    this.cases.set(12,9,Tile.OBSTACLE);
    this.cases.set(13,9,Tile.OBSTACLE);
    this.cases.set(15,9,Tile.OBSTACLE);
    this.cases.set(16,9,Tile.OBSTACLE);
    this.cases.set(8,10,Tile.OBSTACLE);
    this.cases.set(8,11,Tile.OBSTACLE);
    this.cases.set(11,11,Tile.OBSTACLE);
    this.cases.set(1,12,Tile.OBSTACLE);
    this.cases.set(8,12,Tile.OBSTACLE);
    this.cases.set(13,12,Tile.OBSTACLE);
    this.cases.set(14,12,Tile.OBSTACLE);
    this.cases.set(10,13,Tile.OBSTACLE);
    this.cases.set(13,13,Tile.OBSTACLE);
    this.cases.set(16,13,Tile.OBSTACLE);
    this.cases.set(3,14,Tile.OBSTACLE);
    this.cases.set(9,14,Tile.OBSTACLE);
    this.cases.set(10,14,Tile.OBSTACLE);
    this.cases.set(6,15,Tile.OBSTACLE);
    this.cases.set(1,16,Tile.OBSTACLE);
    this.cases.set(6,16,Tile.OBSTACLE);
    this.cases.set(15,16,Tile.OBSTACLE);
    this.cases.set(16,16,Tile.OBSTACLE);
}
