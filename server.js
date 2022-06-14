const express = require("express");

//Body-parser is a middleware. They help to tidy up the request object before we use them. Express lets us use middleware with the use method.
const bodyParser= require('body-parser')

const app = express();

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const url = 'mongodb+srv://Team4:7vap3lwvmEM24GBm@widgets-dash.nlgo8ag.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(url, { useNewUrlParser: true})

const db = mongoose.connection


const schema = new Schema({

})

//To test whether the connection has succeeded or not
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})
//-------------------------------------------------------



//Body parser must be placed before CRUD operations
app.use(bodyParser.urlencoded({extended: true }))


app.listen(3000, function () {
  console.log("listening on 3000");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
