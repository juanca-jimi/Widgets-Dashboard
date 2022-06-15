const { authenticate } = require('passport')
const bcrypt = require('bcrypt')

LocalStrategy = require('passport-local').Strategy

function initialize(passport, getUserByEmail, getUserbyId){

    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email)
        if (user == null){
            return done(null, false, { message: 'No user with that email'})
        }

        try {
          if (await bcrypt.compare(password, user.password))  {
            return done(null, user)
          }
          else {
            return done(null, false, { message: 'Password incorrect'})
          }
        }catch (error) {
            return done(error)
        }
    }

    //below our password field defaults to password which is 
    //what our field is called, therefore not explicitly needed 
    passport.use(new LocalStrategy({usernameField: 'email'}), authenticateUser)
    passport.serializeUser((user, done) => { done(null, user.id)  })
    passport.deserializeUser((id, done) => { 
        return done(null, getUserbyId(id))
    })
}

module.exports = initialize