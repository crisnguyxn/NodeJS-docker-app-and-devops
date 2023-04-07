const express = require('express')
const app = express()
const port = 3000
const MONGO = require('./src/config/config')
const { default: mongoose } = require('mongoose')
const MONGO_URI = `mongodb://${MONGO.MONGO_USERNAME}:${MONGO.MONGO_PASSWORD}@${MONGO.MONGO_IP}:${MONGO.MONGO_PORT}/?authSource=admin`
const blogRouter = require('./src/routes/blogs')
const handleErrorMiddleware = require('./src/middlewares/handle-error')
const authRouter = require('./src/routes/auth')
const authMiddleware = require('./src/middlewares/authMiddleware')
app.use(express.json())

const connectDB = () => {
    mongoose.connect(MONGO_URI)
        .then(() => {
            console.log(`Connected to the database`);
        })
        .catch((err) => {
            console.log(err);
            setTimeout(connectDB,5000)
        })
}
connectDB()

app.get('/',(req,res) => {
    res.send('test again, hihi ddoof,djfoasdif ')
})


app.use('/blogs',authMiddleware,blogRouter)
app.use('/auth',authRouter)
app.use(handleErrorMiddleware)


app.listen(port,console.log(`Server is running on port ${port}`))