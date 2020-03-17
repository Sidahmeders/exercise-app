const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exersiceSchema = new Schema({
    exercise: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    level: {type: String, required: true },
    date: { type: Date, required: true }
});


const Exercise = mongoose.model('Exercise', exersiceSchema)

module.exports = Exercise;
