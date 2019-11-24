export default function getDateList(list) {
  let out = [];

  list.forEach(item => {
    const date = item.dt_txt.substring(0, 10);
    if (out.indexOf(date) === -1) {
      out.push(date);
    }
  });
  return out;
}
