module.exports = function(array, predicate, create) {
  let index = array.findIndex(predicate);
  if (~index) return array[index];
  let item = create(); array.push(item);
  return item;
}
