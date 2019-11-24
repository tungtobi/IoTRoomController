function getDate(dt_txt) {
  return dt_txt.substring(0, 10);
}

export default function forecastOf(date, list) {
  return list.filter(item => getDate(item.dt_txt) === date);
}
