const mongoose = require('mongoose')

const BlogSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true,'Title must be provided']
    },
    body:{
        type:String,
        required:[true,'Body must be provided']
    }
})

module.exports = mongoose.model('Blog',BlogSchema)