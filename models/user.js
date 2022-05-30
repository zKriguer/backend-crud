const mongoose = require('mongoose')

const user = mongoose.model('user', {
    name: String,
    email: String,
    password: String
})
module.exports = user