export default handleDate;

/**
 * @param string ageYear - year value of furbaby's age
 * @param string ageMonth - month value of furbaby's age
 */

function handleDate(ageYear, ageMonth) {
  const today = new Date();
  let [ year, month, date ]  = [ today.getFullYear(), today.getMonth()+1, today.getDate() ];
  year -= ageYear;
  month -= ageMonth;
  if (month <= 0) {
    year += Math.min(-1, Math.floor(month/12));
    month += 12;
  }
  return year+'-'+month+'-'+date;
}