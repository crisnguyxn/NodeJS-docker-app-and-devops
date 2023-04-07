const mongoose = require('mongoose')

const connectDB = (url) => {
    mongoose.connect(url)
        .then(() => {
            console.log(`Connected to the database`);
        })
        .catch((err) => {
            console.log(err);
            setTimeout(connectDB,5000)
        })
}

module.exports = connectDB