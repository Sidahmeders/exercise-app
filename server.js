const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');


const app = express();
app.use(cors());
app.use(express.json());
 
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;
db.once('open', () => console.log('mongoDB connection is Up and running...'))


const exerciseRoute = require('./routes/exercises');
const exerciseNameRoute = require('./routes/exercisesName');

app.use('/exercises', exerciseRoute);
app.use('/exerciseName', exerciseNameRoute);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 4500;

app.listen(port, () => console.log(`listening on port ${port}...`));
