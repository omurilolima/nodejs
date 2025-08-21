const express = require(express);
const router = express.Router();
// Importing Joi for validation
const Joi = require("joi");

// Sample genres data
// In a real application, this would be replaced with a database call
const genres = [
	{ id: 1, name: "Action" },
	{ id: 2, name: "Horror" },
	{ id: 3, name: "Romance" },
];

// Route handlers for genres
router.get("/", (req, res) => {
	res.send(genres);
});

// Route to add a new genre
// Validates the request body and adds a new genre to the genres array
router.post("/", (req, res) => {
	const { error } = validateGenre(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = {
		id: genres.length + 1,
		name: req.body.name,
	};
	genres.push(genre);
	res.send(genre);
});

// Route to update an existing genre
// Validates the request body, finds the genre by ID, updates its name, and returns the updated genre
// If the genre is not found, it returns a 404 error
router.put("/:id", (req, res) => {
	const genre = genres.find((c) => c.id === parseInt(req.params.id));
	if (!genre)
		return res.status(404).send("The genre with the given ID was not found.");

	const { error } = validateGenre(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	genre.name = req.body.name;
	res.send(genre);
});

// Route to delete a genre by ID
// Finds the genre by ID, removes it from the genres array, and returns the deleted genre
router.delete("/:id", (req, res) => {
	const genre = genres.find((c) => c.id === parseInt(req.params.id));
	if (!genre)
		return res.status(404).send("The genre with the given ID was not found.");

	const index = genres.indexOf(genre);
	genres.splice(index, 1);

	res.send(genre);
});

router.get("/:id", (req, res) => {
	const genre = genres.find((c) => c.id === parseInt(req.params.id));
	if (!genre)
		return res.status(404).send("The genre with the given ID was not found.");
	res.send(genre);
});

// Function to validate the genre object using Joi
// It checks if the name is a string with a minimum length of 3 characters and is
function validateGenre(genre) {
	const schema = {
		name: Joi.string().min(3).required(),
	};

	return Joi.validate(genre, schema);
}

module.exports = router;
