const sort = function(array, sorting) {
  if (sorting === 'available') {
    return array.filter(furbaby => !furbaby.spayed && !furbaby.fivpositive);
  } else if (sorting === 'fostered') {
    return array.filter(furbaby => furbaby.spayed && !furbaby.fivpositive);
  } else if (sorting === 'adopted') {
    return array.filter(furbaby => !furbaby.spayed && furbaby.fivpositive);
  }
};

export default sort;