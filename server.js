//REQUIRE STATEMENTS--------------------------------------------------
if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
const express = require('express'),
      Signup = require('./models/Signup'),
      mongoose = require('mongoose'),
      login = require('./models/Login'),
      passport = require('passport'),
      initializePassport = require('./passport-config'),   
      cors = require('cors'),
      bcrypt = require('bcrypt'),
      passportLocalMongoose = require('passport-local-mongoose'),
      methodOverride = require('method-override'),
      flash = require('express-flash'),
      session = require('express-session'),
 { getapi } = require('./JavascriptFiles/quotes');

//const { session, authenticate } = require('passport');

//--------------------------------------------------------------------

//TODO: encrypt url
//Due to security, this url is only for storing the username and passwords
const url = process.env.USER_DB_CONNECTION,      
      app = express();

mongoose.connect(url, {useNewUrlParser: true})
const db = mongoose.connection;
//To test whether the connection has succeeded or not------------
db.once('open', _ => {console.log('Database connected...')})
db.on('error', err => {console.error('connection error:', err)})
//---------------------------------------------------------------



initializePassport(
  passport, 
  email => login.find(login => login.email === email),
  password => login.find(login => login.password === password)
)




app.set("view engine", "ejs");
//Body parser must be placed before CRUD operations
app.use(express.urlencoded({extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(express.static('./public'))


//HOME PAGE
//If the user is already authenticated, they will be directored to their dashboard
app.get("/", checkAuthenticated, (req, res) => {
  res.render("login",{})
});

app.get("/login", checkNotAuthenticated, function (req, res) {
  res.render("login", {});
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
  res.render("create_account");
  const newUser = new Signup({
    first_name: String,
    middle_name: String,
    last_name: String,
    email: String,
    phone_number: Number,
    birthday: String, 
    password: String,
  })
  newUser.save(function (error, document){
    if (err) console.error(err)
    console.log(document)
  })
});

// Handling user signup
app.post("/register", checkNotAuthenticated, async function (req, res) {
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

app.get("/dashboard",  async function (req, res ){
  const quotes = await getapi();

  res.render('dashboard', { quotes })



})












// passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());




var port = process.env.PORT || 3000;
app.listen(port, function () {
   console.log("Server has started on port " + port);
});






function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return res.redirect('/dashboard')
  }
  next()
}




// function saveSignup(signup){
//   const s = new Signup(signup)
//   return s.save()
// }
// saveSignup({
//   first_name: test,
//   middle_initial: test,
//   last_name: test,
//   email: test,
//   phone_number: test,
//   password: test,
//   birthday: test,
// })
// .then(doc => { console.log(doc)})
// .catch(error => { console.error(error)})
