// Load mongoose
const mongoose = require('mongoose');
// Load Joi for validation
const Joi = require('joi');
// Load express and create a router
const express = require('express');
const router = express.Router();

// Create a Model and a Schema for Genre
const Genre = mongoose.model('Genre', new mongoose.Schema({
  name: { 
      type: String, 
      required: true, 
      minlength: 5, 
      maxlength: 50 }
}));

// Get all genres
router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  if (!genres) return res.status(404).send('No genres found.');
  // Return the list of genres
  res.send(genres);
});

// Create a new genre
router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name }); // Create a new genre
  genre = genre.save(); // Save the genre to the database
  res.send(genre);  // Return the saved genre
});

// Update an existing genre
router.put('/:id', async (req, res) => {
  // Validate the request body
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  // Find the genre by ID and update it
  const genre = await Genre.findByIdAndUpdate(
    req.params.id, 
    {name: req.body.name}, 
    { new: true}
  );

  // If genre not found, return 404
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  // Return the updated genre
  res.send(genre);
});

// Delete a genre
router.delete('/:id', async (req, res) => {
  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send('Invalid ID format');

  // Find the genre by ID and remove it
  const genre = await Genre.findByIdAndDelete(req.params.id);
  // If genre not found, return 404
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  // Return the removed genre
  res.send(genre);
});

router.get('/:id', async (req, res) => {
  // Find the genre by ID
  const genre = await Genre.findById(req.params.id)
  // If genre not found, return 404
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  // Return the genre
  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

module.exports = router;