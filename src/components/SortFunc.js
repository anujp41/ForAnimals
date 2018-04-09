const sort = function(array, sorting) {
  if (sorting === 'Available') {
    return array.filter(furbaby => !furbaby.fostered && !furbaby.adopted);
  } else if (sorting === 'Fostered') {
    return array.filter(furbaby => furbaby.fostered);
  } else if (sorting === 'Adopted') {
    return array.filter(furbaby => furbaby.adopted);
  } else if (sorting === 'Has FIV') {
    return array.filter(furbaby => furbaby.fivpositive);
  } else if (sorting === 'Is Spayed') {
    return array.filter(furbaby => furbaby.spayed);
  } else if (sorting === 'Age: Youngest') {
    return array.slice().sort((prev, furbaby) => prev.age - furbaby.age, {age: 0});
  } else if (sorting === 'Age: Oldest') {
    return array.slice().sort((prev, furbaby) => furbaby.age - prev.age, {age: 0});
  }
};

export default sort;