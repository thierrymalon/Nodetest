var monNamespace = monNamespace || {};

monNamespace.Personnage = function(id, position, rayon, couleur, direction, niveau, exp, pdvMax, pdvRestants, puissance, resistance, vitesse, sorts)
{
    this.id = id;
    this.position = position;
    this.rayon = rayon;
    this.couleur = couleur;
    this.direction = direction;
    this.etat = 0;
    this.niveau = niveau;
    this.exp = exp;
    this.pdvMax = pdvMax;
    this.pdvRestants = pdvRestants;
    this.puissance = puissance;
    this.resistance = resistance;
    this.vitesse = vitesse;
    this.sorts = sorts;

    this.moving = false;


    var self = this;
    var onKeyDown = function(event) {self.onKeyDown(event);};
    var onKeyUp = function(event) {self.onKeyUp(event);};

    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
}

Personnage.prototype.changeSort = function(sort,idxSort) {
    this.sorts[idxSort] = sort;
}

Personnage.prototype.onKeyEvent = function(event) {
    switch (event.keyCode);
}
