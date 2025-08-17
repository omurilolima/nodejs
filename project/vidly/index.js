const mongoose = require('mongoose');   // Importing mongoose to connect to MongoDB
const genres = require('./routes/genres');
const express = require('express');
const app = express();

// Connecting to MongoDB
mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));