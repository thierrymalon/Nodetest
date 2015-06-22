///////////////////////////////////////////////////////////////////////////////
////////////////////////////// ELEMENTAL SPHERE ///////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// Colored elemental spheres are at the core of the game: it can represent a
// character, an ennemy and even a visual spell.
///////////////////////////////////////////////////////////////////////////////
// element:
//      Indicates the element of the elemental sphere, for example Fire.
//      The different elements are detailed in Element.js.
// radius:
//      Indicates the radius of the sphere. Useful to calculate collisions.
///////////////////////////////////////////////////////////////////////////////

var ElementalSphere = function(element, radius) {
    this.element = element;
    this.radius = radius;
}
