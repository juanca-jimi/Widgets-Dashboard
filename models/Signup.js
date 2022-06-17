const mongoose = require('mongoose')
const Schema = mongoose.Schema

const signupSchema = new Schema({
    
    //TODO: for fields that require a specific format (i.e. email), perhaps object may be preferred
    first_name: String,
    middle_name: String,
    last_name: String,
    email: String,
    phone_number: String,
    birthday: String, //TODO: Decide whether it's better to store this as a string, number or object
    password: String,

})



module.exports = mongoose.model('Signup', signupSchema)