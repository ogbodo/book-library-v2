//This is where the prototypical inheritance occurs and gets exported for external use by importation.
module.exports = function(parent, child) {
  child.prototype = Object.create(parent.prototype); //Make the child object inherits the prototype of the parent
  child.constructor = child; //Manually assign the constructor of the child object to point to the child object instead of the parent object which happened during inheritance.
};
