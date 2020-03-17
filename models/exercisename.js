const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    exercise: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    }
},{
    timestamps: true
});


const Exercise = mongoose.model('ExerciseName', exerciseSchema)

module.exports = Exercise;
