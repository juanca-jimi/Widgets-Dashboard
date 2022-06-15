//REQUIRE STATEMENTS--------------------------------------------------
require('dotenv').config()
const express = require('express'),
      Signup = require('./models/Signup'),
      mongoose = require('mongoose'),
      login = require('./models/Login'),
      passport = require('passport'),
      initializePassport = require('./JavascriptFiles/passport-config'),   
      cors = require('cors'),
      bcrypt = require('bcrypt'),
      passportLocalMongoose = require('passport-local-mongoose'),
      methodOverride = require('method-override'),
      flash = require('express-flash');
const { session } = require('passport');

//--------------------------------------------------------------------

//TODO: encrypt url
//Due to security, this url is only for storing the username and passwords
const url = 'mongodb+srv://Team4:7vap3lwvmEM24GBm@widgets-dash.nlgo8ag.mongodb.net/?retryWrites=true&w=majority',
      db = mongoose.connection,
      app = express();

      mongoose.connect(url)

initializePassport(
  passport, 
  email => {
  User. //TODOLfind the user based on the email., 
  },
  id => {

  }
)

app.set("view engine", "ejs");
//Body parser must be placed before CRUD operations
app.use(express.urlencoded({extended: true }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(cors())

//HOME PAGE
//If the user is already authenticated, they will be directored to their dashboard
app.get("/", checkAuthenticated, (req, res) => {
  res.render("login.ejs")
});

app.get("/login", checkNotAuthenticated, function (req, res) {
  res.render("login.ejs");
});


//Handling user login
app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true
  }), function (req, res) {
});

//REGISTER FORM or sign up page
app.get("/register", checkNotAuthenticated, function (req, res) {
  res.render("register.ejs");
});

// Handling user signup
app.post("/register", checkNotAuthenticated, function (req, res) {
  try {
    //Asynchronous code
    //This uses the bcrypt npm library to hash the passwords
    //10 is the amount of times the hash is generated
    //10 allows the hash to be performed quickly, yet still be secure
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    User.push({
      //taking form input and pushing it to our DB
      first_name: req.body.first_name,
      middle_name: req.body.middle_name,
      last_name:req.body.last_name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      birthday: req.body.birthday,
      password: req.body.password
    })
    //successful registration takes you to register
    res.redirect('login')
  } catch  {
    //unsuccessful registration leaves you in this page
    res.redirect('/register')
  }
});

app.delete('/logout', (req,res) => {
  req.logOut()
  res.redirect('/login')
})







//To test whether the connection has succeeded or not------------
db.once('open', _ => {console.log('Database connected:', url)})
db.on('error', err => {console.error('connection error:', err)})
//---------------------------------------------------------------




passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// //SHOW SECRET PAGE
// app.get("/secret", isLoggedIn, function (req, res) {
//   res.render("secret");
// });



var port = process.env.PORT || 3000;
app.listen(port, function () {
   console.log("Server Has Started!");
});






function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  
  res.redirect("/login.ejs");
}

function checkNotAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return res.redirect('/')
  }
  next()
}




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
