const fetch = require("node-fetch");

const api_url =
  "https://zenquotes.io/api/random/b4bf859585816410f1abbc6a9b79f321494fdebb";

async function getapi(url) {
  const response = await fetch(url);
  var data = await response.json();
  console.log(data);
}

getapi(api_url);
