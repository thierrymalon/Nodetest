var Matrix = function(height, width) {
    this.height = height;
    this.width = width;
    this.data = new Array(height, width);
}

Matrix.prototype.get = function(i,j) {
    return this.data[i*this.width+j];
}

Matrix.prototype.set = function(i,j,value) {
    this.data[i*this.width+j] = value;
}
