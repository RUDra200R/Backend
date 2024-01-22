// Api formation
const cookieParser = require('cookie-parser')

const express = require('express')

require('dotenv').config()
const app = express()

// regular middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//cookie middleware
app.use(cookieParser())

const userRouter = require('./routes/userRoutes')

app.use('/api', userRouter)


app.get('/', (req, res)=> {
    res.send("Hello World")
})

app.listen(2000, ()=>{
    console.log("Server is running on port 2000");
})