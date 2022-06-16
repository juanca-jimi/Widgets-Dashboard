const fetch = require("node-fetch");

const api_url = "https://api.imgflip.com/get_memes";
async function getapi(api_url) {
  const response = await fetch(api_url);
  var data = await response.json();
  //console.log(data.data.memes[0]);
  getRandomMeme(data);
}

function getRandomMeme(data) {
  for (let i = 0; i < data.data.memes.length; i++) {
    const memesArray = data.data.memes[i];
    console.log(memesArray);
    // const randMeme =
    //   data.data.memes[Math.floor(Math.random() * data.data.memes.length)];
    // console.log(randMeme);
  }
}
getapi(api_url);

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
