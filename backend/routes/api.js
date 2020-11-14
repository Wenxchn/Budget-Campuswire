const express = require('express')
const router = express.Router()
const Question = require('../models/Question')
const isAuthenticated = require('../middlewares/isAuthenticated')

router.get('/questions', async (req, res) => {
    try {
        const question = await Question.find()
        res.send(question)
    } catch {
        res.send('Could not pull questions')
    }
})

router.post('/questions/add', isAuthenticated, async (req, res) => {
    const { questionText, author } = req.body
    try {
        await Question.create({ questionText, author })
        res.send('Question was successfully created')
    } catch {
        res.send('Question failed to create')
    }
})

router.post('/questions/answer', isAuthenticated, async (req, res) => {
    const { questionText, answer, author } = req.body
    try {
        await Question.findOneAndUpdate({ questionText, author }, { answer }, { useFindAndModify: false })
        res.send('Question was sucessfully answered')
    } catch {
        res.send('Question failed to answer')
    }
})

module.exports = router