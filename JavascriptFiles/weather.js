const fetch = require("node-fetch");

const apiKey = "7b905a6622af3dfb1106346482f144ab";
function fetchWeather(zip) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?zip=" +
      zip +
      ",us&appid=" +
      apiKey
  )
    .then((response) => {
      if (!response.ok) {
        alert("No weather found.");
        throw new Error("No weather found.");
      }
      return response.json();
    })
    .then((data) => console.log(data));
}
//fetchWeather("75204");
module.exports = { fetchWeather };

/*
{
  coord: { lon: -96.7851, lat: 32.8038 },
  weather: [ { id: 721, main: 'Haze', description: 'haze', icon: '50d' } ],
  base: 'stations',
  main: {
    temp: 309.09,
    feels_like: 312.53,
    temp_min: 308.09,
    temp_max: 310.22,
    pressure: 1012,
    humidity: 41
  },
  visibility: 10000,
  wind: { speed: 11.32, deg: 160, gust: 16.46 },
  clouds: { all: 40 },
  dt: 1655239300,
  sys: {
    type: 2,
    id: 2018848,
    country: 'US',
    sunrise: 1655205518,
    sunset: 1655256982
  },
  timezone: -18000,
  id: 0,
  name: 'Dallas',
  cod: 200
}


*/
