export default function convertIndexesToChart(data) {
  let indexes2Chart = {
    AQI: [],
    Humidity: [],
    Temperature: []
  };

  let categories = [];

  const LASTEST = new Date(data[data.length - 1].Date);

  const STEP = 20; // minutes;
  const MINUTE_TO_MILLISECOND = 60000;

  let currentTime = new Date(data[0].Date).getTime();

  let index = 0;

  const convertDateToString = date => {
    return (
      date.toISOString().substring(0, 10) + " " + date.toLocaleTimeString()
    );
  };

  const MAX_ZERO_STEP = 3;
  let count = 0;

  while (currentTime <= LASTEST.getTime()) {
    let currentDate = new Date(currentTime);
    let currentData = data.find(d => {
      const tmpDate = new Date(d.Date);
      return (
        tmpDate.getDate() === currentDate.getDate() &&
        tmpDate.getHours() === currentDate.getHours() &&
        tmpDate.getMinutes() === currentDate.getMinutes()
      );
    });

    if (!currentData) {
      count++;
      currentData = {
        AQI: 0,
        Humidity: 0,
        Temperature: 0,
        Date: convertDateToString(currentDate)
      };
      if (count === Math.ceil(MAX_ZERO_STEP / 2)) currentData.Date = "...";
    } else {
      count = 0;
      if (index > 0 && indexes2Chart.AQI[index - 1] === 0) {
        currentDate = new Date(currentTime - STEP * MINUTE_TO_MILLISECOND);
        categories[index - 1] = convertDateToString(currentDate);
      }
    }
    if (count <= MAX_ZERO_STEP) {
      indexes2Chart.AQI[index] = currentData.AQI;
      indexes2Chart.Humidity[index] = currentData.Humidity;
      indexes2Chart.Temperature[index] = currentData.Temperature;
      categories[index] = currentData.Date;
      index++;
    }

    currentTime += STEP * MINUTE_TO_MILLISECOND;
  }

  return {
    ...indexes2Chart,
    categories
  };
}
