const express = require("express");

//Body-parser is a middleware. They help to tidy up the request object before we use them. Express lets us use middleware with the use method.
const bodyParser= require('body-parser')

const app = express();


//Body parser must be placed before CRUD operations
app.use(bodyParser.urlencoded({extended: true }))


app.listen(3000, function () {
  console.log("listening on 3000");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
