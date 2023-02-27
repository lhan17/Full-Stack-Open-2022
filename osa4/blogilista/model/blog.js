const mongoose = require('mongoose')
const config = require('../utils/config')
const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)
const mongoUrl = config.MONGODB_URI
mongoose.set('strictQuery', false)
mongoose.connect(mongoUrl)
module.exports = Blog