const fetch = require("node-fetch");

const api_url =
  "https://zenquotes.io/api/random/b4bf859585816410f1abbc6a9b79f321494fdebb";

const quotesRender = document.querySelector("#quotes-api");
async function getapi(url) {
  const response = await fetch(url);
  var data = await response.json();
  console.log(data);
  const quote = document.createElement("p");
  quote.innerHTML = data.q;
  quotesRender.appendChild(quote);
}

getapi(api_url);

// [
//   {
//     q: 'The greatest mistake you can make in life is to be continually fearing you will make one.',
//     a: 'Elbert Hubbard',
//     h: '<blockquote>&ldquo;The greatest mistake you can make in life is to be continually fearing you will make one.&rdquo; &mdash; <footer>Elbert Hubbard</footer></blockquote>'
//   }
// ]
