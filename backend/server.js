require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const path = require('path')
// const { logger, logEvents } = require('./middleware/logger')
// const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
// const fs = require('fs');
const formidableMiddleware = require('express-formidable');

const PORT = process.env.PORT || 3500

console.log(process.env.NODE_ENV)
console.log("hi")

connectDB()

// app.use(logger)

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({limit: '25mb', extended: true}));

app.use(formidableMiddleware({
  encoding: 'utf-8',
  uploadDir: path.join(__dirname, 'uploads'),
  multiples: true, // req.files to be arrays of files
}))
 
app.post('/upload', (req, res) => {
  req.fields // contains non-file fields
  req.files // contains files
  res.status(200).json({message: "ok"})
});

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes/root'))
app.use('/tours', require('./routes/tours'))

//Image routes
app.use('/images', require('./routes/images'))  

app.post('/uploads',
  (req,res) => {
    console.log('Files '+JSON.stringify(req.files));// contains data about file fields
    console.log('Fields '+JSON.stringify(req.fields));//contains data about non-file fields
    res.status(200).json({message: "ok"})
  });


app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})


// app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    // logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})