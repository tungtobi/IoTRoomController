export function getDate(dt_txt) {
  return dt_txt.substring(0, 10);
}

export function getDayFromDate(date) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const dt = new Date(date);

  return weekday[dt.getDay()];
}

export function forecastOf(date, list) {
  return list.filter(item => getDate(item.dt_txt) === date);
}
