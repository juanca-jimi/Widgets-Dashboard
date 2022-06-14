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
fetchWeather("75204");
