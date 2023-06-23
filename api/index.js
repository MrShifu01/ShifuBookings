const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const User = require('./models/User')
const Place = require('./models/Place')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const fs = require('fs')
const download = require('image-downloader')
const multer = require('multer')

const app = express()
const salt = bcrypt.genSaltSync(10)
mongoose.connect(process.env.MONGO_URI)

// Middleware
const photosMiddleware = multer({dest: 'uploads/'})
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin: 'http://localhost:5173'
}))

// User registration
app.post('/register', async (req, res) => {
    const {name, email, password} = req.body
    try {
        const userDoc = await User.create({
            name, 
            email, 
            password:bcrypt.hashSync(password, salt)
        })
        jwt.sign({email:userDoc.email, id:userDoc._id}, process.env.JWT_SECRET, {}, (error, token) => {
            if (error) throw error
            res.cookie('token', token).json(userDoc)
        })
    } catch (e) {
        res.status(400).json("Unable to register user")
    }
})

// User login
app.post('/login', async (req, res) => {
    const { email, password } = req.body
    const userDoc = await User.findOne({email})
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if (passOk) {
            jwt.sign({email:userDoc.email, id:userDoc._id}, process.env.JWT_SECRET, {}, (error, token) => {
                if (error) throw error;
                res.cookie('token', token).json(userDoc)
            })
        } else {
            res.status(400).json(userDoc)
        }
    } else {
        res.status(400).json('user not found')
    }
    
})

// User Logout
app.post('/logout', (req, res) => {
    res.cookie('token', '').json('logged out')
})

// Upload Photos By Link
app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body
    const newName = "photo" + Date.now() + '.jpg'
    await download.image({
        url: link,
        dest: `${__dirname}/uploads/${newName}`
    })
    res.json(newName)
})

// Upload Photos by Upload
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = []
    for (let i = 0; i < req.files.length; i++) {
        const path = req.files[i].path
        const originalname = req.files[i].originalname
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        const newPath = path + '.' + ext
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace('uploads/', ''))
    }
    res.json(uploadedFiles)
})

app.post('/places', async (req, res) => {
    const { token } = req.cookies
    const { title, addedPhotos, location, description, checkIn, checkOut, maxGuests, price, features, extraInfo } = req.body
    jwt.verify(token, process.env.JWT_SECRET, {}, async (error, userData) => {
        if (error) throw error
        await Place.create({
            owner: userData.id,
            title: title,
            location: location,
            photos: addedPhotos,
            description: description,
            features: features,
            extraInfo: extraInfo,
            checkIn: checkIn,
            checkOut: checkOut,
            maxGuests: maxGuests,
            price: price,
        })
    })
    res.status(200).json('Place Added')
    
})

app.listen(8000) 