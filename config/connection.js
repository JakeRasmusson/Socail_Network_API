const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.Mongo_DB_URL || 'mongodb://127.0.0.1:27017/socialNetworkDb')

module.exports = mongoose.connection