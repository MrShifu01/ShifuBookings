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
const mime = require('mime-types') 

const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3')
const Booking= require('./models/Booking')

const app = express()
const salt = bcrypt.genSaltSync(10)
const bucket = 'shifubookings'

// Middleware
const photosMiddleware = multer({dest: '/tmp'})
app.use('/api/uploads', express.static(__dirname + '/uploads'))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin: 'http://localhost:5173'
}))

// Amazon AWS s3 bucket
async function uploadToS3 (path, originalFilename, mimetype) {
    const client = new S3Client({
        region: 'eu-north-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
        },
    })
    const parts = originalFilename.split('.')
    const ext = parts[parts.length - 1]
    const newFilename = Date.now() + '.' + ext
    const data = await client.send(new PutObjectCommand({
        Bucket: bucket,
        Body: fs.readFileSync(path),
        Key: newFilename,
        ContentType: mimetype,
        ACL: 'public-read'
    }))
    return `https://${bucket}.s3.amazonaws.com/${newFilename}`
}

// User registration
app.post('/api/register', async (req, res) => {
    mongoose.connect(process.env.MONGO_URI)
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
app.post('/api/login', async (req, res) => {
    mongoose.connect(process.env.MONGO_URI)
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
app.post('/api/logout', (req, res) => {
    res.cookie('token', '').json('logged out')
})

// Upload Photos By Link
app.post('/api/upload-by-link', async (req, res) => {
    mongoose.connect(process.env.MONGO_URI)
    const { link } = req.body
    const newName = "photo" + Date.now() + '.jpg'
    await download.image({
        url: link,
        dest: '/tmp/' + newName
    })
    const url = await uploadToS3('/tmp/' + newName, newName, mime.lookup('/tmp/' + newName))
    res.json(url)
})

// Upload Photos by Upload
app.post('/api/upload', photosMiddleware.array('photos', 100), async (req, res) => {
    mongoose.connect(process.env.MONGO_URI)
    const uploadedFiles = []
    for (let i = 0; i < req.files.length; i++) {
        const path = req.files[i].path
        const originalname = req.files[i].originalname
        const mimetype = req.files[i].mimetype
        const url = await uploadToS3(path, originalname, mimetype)
        uploadedFiles.push(url)
    }
    res.json(uploadedFiles)
})

// Post a new place
app.post('/api/places', async (req, res) => {
    mongoose.connect(process.env.MONGO_URI)
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

// Get places for a specific user
app.get('/api/user-places', (req, res) => {
    mongoose.connect(process.env.MONGO_URI)
    const { token } = req.cookies
    jwt.verify(token, process.env.JWT_SECRET, {}, async (error, userData) => {
        if (error) throw error
        const userId = userData.id
        const userPlaces =  await Place.find({owner: userId})
        res.status(200).json(userPlaces)
    })
})

// Get individual place according to ID
app.get('/api/places/:id', async (req, res) => {
    mongoose.connect(process.env.MONGO_URI)
    const { id } = req.params
    const placeInfo = await Place.findById(id)
    res.json(placeInfo)
})

// Update Places
app.put('/api/places', async (req, res) => {
    mongoose.connect(process.env.MONGO_URI)
    const { token } = req.cookies
    const { id, title, addedPhotos, location, description, checkIn, checkOut, maxGuests, price, features, extraInfo } = req.body
    
    jwt.verify(token, process.env.JWT_SECRET, {}, async (error, userData) => {
        const placeDoc = await Place.findById(id)
        if (error) throw error
        if (userData.id === placeDoc.owner.toString()) {
            await Place.updateOne({_id:id}, {$set: {title, photos:addedPhotos, location, description, checkIn, checkOut, maxGuests, price, features, extraInfo}})
            
            res.json('ok')
        }
    })

    
})

// Get all Places
app.get('/api/places', async (req, res) => {
    mongoose.connect(process.env.MONGO_URI)
    const places = await Place.find()
    res.json(places)
})

// Get One place
app.get('/api/place/:id', async (req, res) => {
    mongoose.connect(process.env.MONGO_URI)
    const {id} = req.params
    const place = await Place.findById(id)
    res.json(place)
})

// Make a booking
app.post('/api/bookings', async (req, res) => {
    mongoose.connect(process.env.MONGO_URI)
    const { checkIn, checkOut, guests, name, email, place, price } = req.body
    const { token } = req.cookies

    jwt.verify(token, process.env.JWT_SECRET, {}, async (error, userData) => {
        if (error) throw error
        const bookingDoc = await Booking.create({
            checkIn, checkOut, guests, name, email, place, price, user:userData.id
        })
        res.status(200).json(bookingDoc)
    })


})

// Get users bookings
app.get('/api/bookings', async (req, res) => {
    mongoose.connect(process.env.MONGO_URI)
    const { token } = req.cookies

    jwt.verify(token, process.env.JWT_SECRET, {}, async (error, userData) => {
        if (error) throw error
        const user = userData.id
        const bookingDocs = await Booking.find({user}).populate('place').populate('user')
        res.status(200).json(bookingDocs)
    })
    
})

app.listen(8000) 