export default sort;

function sort(array, sorting) {
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
  } else if (sorting === 'Age: Oldest') {
    return array.slice().sort((prev, furbaby) => prev.birthDate - furbaby.birthDate, {birthDate: 0});
  } else if (sorting === 'Age: Youngest') {
    return array.slice().sort((prev, furbaby) => furbaby.birthDate - prev.birthDate, {birthDate: 0});
  } else if (sorting === 'Brought to Shelter: Most Recent') {
    return array.slice().sort((prev, furbaby) => furbaby.arrivedDate - prev.arrivedDate, {arrivedDate: 0});
  } else if (sorting === 'Brought to Shelter: Most Previous') {
    return array.slice().sort((prev, furbaby) => prev.arrivedDate - furbaby.arrivedDate, {arrivedDate: 0});
  }
};