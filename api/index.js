const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const User = require('./models/User')
const Place = require('./models/Place')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const app = express()
const salt = bcrypt.genSaltSync(10)
mongoose.connect(process.env.MONGO_URI)

// Middleware
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

app.listen(8000) 