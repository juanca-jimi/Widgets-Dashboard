
//REQUIRE STATEMENTS--------------------------------------------------
require('dotenv').config()
const express = require('express'),
      Signup = require('./models/Signup'),
      mongoose = require('mongoose'),
      login = require('./models/Login'),
      passport = require('passport'),
      LocalStrategy = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose');
//--------------------------------------------------------------------

let PORT = process.env.PORT || 8080;
//TODO: encrypt url
//Due to security, this url is only for storing the username and passwords
const url = 'mongodb+srv://Team4:7vap3lwvmEM24GBm@widgets-dash.nlgo8ag.mongodb.net/?retryWrites=true&w=majority',
      db = mongoose.connection,
      app = express();


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(url)


//To test whether the connection has succeeded or not------------
db.once('open', _ => {console.log('Database connected:', url)})
db.on('error', err => {console.error('connection error:', err)})
//---------------------------------------------------------------

//Body parser must be placed before CRUD operations
app.use(express.urlencoded({extended: true }))
app.listen(3000, function () {console.log("listening on 3000");});
app.set("view engine", "ejs");

app.use(passport.initialize());
app.use(passport.session());
app.use(cors())

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//HOME PAGE
app.get("/", (req, res) => {res.render("home")});

//SHOW SECRET PAGE
app.get("/secret", isLoggedIn, function (req, res) {
  res.render("secret");
});

//REGISTER FORM or sign up page
app.get("/register", function (req, res) {
  res.render("register");
});

// Handling user signup
app.post("/register", function (req, res) {
  var username = req.body.username
  var password = req.body.password
  User.register(new User({ username: username }),
          password, function (err, user) {
      if (err) {
          console.log(err);
          return res.render("register");
      }

      passport.authenticate("local")(
          req, res, function () {
          res.render("secret");
      });
  });
});

app.get("/login", function (req, res) {
  res.render("login");
});

//Handling user login
app.post("/login", passport.authenticate("local", {
  successRedirect: "/secret",
  failureRedirect: "/login"
}), function (req, res) {
});

//Handling user logout
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});

function saveSignup(signup){
  const s = new Signup(signup)
  return s.save()
}
saveSignup({
  first_name: test,
  middle_initial: test,
  last_name: test,
  email: test,
  phone_number: test,
  password: test,
  birthday: test,
})
.then(doc => { console.log(doc)})
.catch(error => { console.error(error)})
