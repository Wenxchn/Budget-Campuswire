const express = require('express')
const User = require('../models/user')
const router = express.Router()
const isAuthenticated = require('../middlewares/isAuthenticated')

router.post('/signup', async (req, res) => {
    const { username, password } = req.body
    try {
        await User.create({ username, password })
        res.send('Signup was successful')
    } catch {
        res.send('Failed to signup')
    }
})

router.post('/login', (req, res) => {
    const { username, password } = req.body
    User.findOne({ username, password }, (err, user) => {
        if (user) {
            req.session.username = username
            req.session.password = password
            res.send('Logged in')
        } else {
            res.send('Failed to log in')
        }
    })
})

router.post('/logout', isAuthenticated, (req, res) => {
    req.session.username = ''
    req.session.password = ''
    res.send('User logged out')
    res.json({ status: 'OK' })
})

module.exports = router 