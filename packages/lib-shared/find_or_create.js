module.exports = (array, predicate, create) => {
  const index = array.findIndex(predicate);
  if (~index) return array[index];
  const item = create(); array.push(item);
  return item;
};
