const express = require('express');
const router = express.Router();
const ExerciseName = require('../models/exercisename')


router.get('/', (req, res) => {
    ExerciseName.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json(`error: ${err}`))
});

router.post('/add', (req, res) => {
    const exercise = req.body.exercise;
    const newExercise = new ExerciseName({exercise});
    newExercise.save()
    .then(() => res.json("User Added."))
    .catch(err => res.status(400).json(`error: ${err}`))
})

router.delete('/:id', (req, res) => {
    ExerciseName.findByIdAndDelete(req.params.id)
    .then(() => res.json(`exercise deleted`))
    .catch(err => res.status(400).json(`Erorr: ${err}`))
});

module.exports = router;
