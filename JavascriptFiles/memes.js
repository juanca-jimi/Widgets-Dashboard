const fetch = require("node-fetch");

async function getMemes() {
  const api_url = "https://api.imgflip.com/get_memes";
  const response = await fetch(api_url);
  var data = await response.json();
  //console.log(data.data.memes[0]);
}

module.exports = { getMemes };

// data response output
// {
//     success: true,
//     data: {
//       memes: [
//         [Object], [Object], [Object], [Object], [Object], [Object],
//         [Object], [Object], [Object], [Object], [Object], [Object],
//         [Object], [Object], [Object], [Object], [Object], [Object],
//         [Object], [Object], [Object], [Object], [Object], [Object],
//         .
//         .
//         .]
