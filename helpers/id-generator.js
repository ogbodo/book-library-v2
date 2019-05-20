//Make this function available for external use by importation
module.exports = function(collection) {
  /*First checks if this collection has element in it. If yes, get the id value of the last element in the collection and increment it by one and return it.
   *If No, just returns 1.*/
  return collection.length > 0 ? collection[collection.length - 1].id + 1 : 1;
};
