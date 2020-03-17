const express = require('express');
const router = express.Router();
const Exercise = require('../models/exercise');


router.get('/', (req, res) => {
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.json(err))
});
  
router.post('/add', (req, res) => {
    const exercise = req.body.exercise;
    const description = req.body.Description;
    const duration = req.body.Duration;
    const level = req.body.level;
    const date = Date.parse(req.body.Date);
    const newExercise = new Exercise({
        exercise,
        description,
        level,
        duration,
        date
    });
    newExercise.save()
    .then(() => res.json('new Exercise Added.'))
    .catch(err => res.status(400).json(`error: ${err}`))
});

router.get('/:id', (req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json(`error: ${err}`))
});
 
router.post('/update/:id', (req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.exercise = req.body.exercise;
        exercise.description = req.body.Description;
        exercise.level = req.body.level;
        exercise.duration = req.body.Duration;
        exercise.date = Date.parse(req.body.Date);
        
        exercise.save()
        .then(() => res.json(`exercise Upadted successfully`))
        .catch(err => res.status(400).json(`Error: ${err}`))
    })
    .catch(err => res.status(400).json(`Error: ${err}`))
});

router.delete('/:id', (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json(`exercise deleted`))
    .catch(err => res.status(400).json(`Erorr: ${err}`))
});




module.exports = router;
