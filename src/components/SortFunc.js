const sort = function(array, sorting) {
  if (sorting === 'Available') {
    return array.filter(furbaby => !furbaby.fostered && !furbaby.adopted);
  } else if (sorting === 'Fostered') {
    return array.filter(furbaby => furbaby.fostered);
  } else if (sorting === 'Adopted') {
    return array.filter(furbaby => furbaby.adopted);
  }
};

export default sort;