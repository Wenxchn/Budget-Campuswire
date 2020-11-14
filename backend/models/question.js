const { Schema, model } = require('mongoose')

const questionSchema = new Schema({
    questionText: { type: String, required: true},
    answer: String,
    author: { type: String, required: true }
})

module.exports = model('Question', questionSchema)