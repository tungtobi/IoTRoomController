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

  while (currentTime <= LASTEST.getTime()) {
    const currentDate = new Date(currentTime);
    let currentData = data.find(d => {
      const tmpDate = new Date(d.Date);
      return (
        tmpDate.getHours() === currentDate.getHours() &&
        tmpDate.getMinutes() === currentDate.getMinutes()
      );
    });

    if (!currentData) {
      currentData = {
        AQI: indexes2Chart.AQI[index - 1],
        Humidity: indexes2Chart.Humidity[index - 1],
        Temperature: indexes2Chart.Temperature[index - 1],
        Date: categories[index - 1]
      };
    }

    indexes2Chart.AQI[index] = currentData.AQI;
    indexes2Chart.Humidity[index] = currentData.Humidity;
    indexes2Chart.Temperature[index] = currentData.Temperature;
    categories[index] = currentData.Date;

    index++;
    currentTime += STEP * MINUTE_TO_MILLISECOND;
  }

  return {
    ...indexes2Chart,
    categories
  };
}
