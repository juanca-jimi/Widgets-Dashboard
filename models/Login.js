const mongoose = require('mongoose')
const Schema = mongoose.Schema

const loginSchema = new Schema({
    
    email: String,
    password: String

})

module.exports = mongoose.model('Login', loginSchema)