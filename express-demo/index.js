// NPM Pug: https://www.npmjs.com/package/pug
// 		Pug is a high performance template engine heavily
// 		influenced by Haml and implemented with JavaScript for Node.js and browsers.
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");

const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("joi");
const logger = require("./logger");
const auth = require("./auth");
const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views"); // default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

// Configuration
console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));

// 		set a password environment variable: '$env:app_password = "your-password"'
console.log("Mail Password: " + config.get("mail.password"));

// Enable logging of http requests only on the development machine
if (app.get("env") === "development") {
	app.use(morgan("tiny"));
	startupDebugger("Morgan enabled..."); // $env:DEBUG = "app:startup"'
}

// Db work...
dbDebugger("Connected to the database..."); // $env:DEBUG = "app:db"'

// To see debugging messages for multiples name spaces, use a comma:  $env:DEBUG = "app:startup, app:db"
// To see ALL the debugging messages, use a wild card:  $env:DEBUG = "app:*"

app.use(logger);
app.use(auth);

const courses = [
	{ id: 1, name: "course1" },
	{ id: 2, name: "course2" },
	{ id: 3, name: "course3" },
];

app.get("/", (req, res) => {
	res.render("index", { title: "My Express App", message: "Hello" });
});

app.get("/api/courses", (req, res) => {
	res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
	const course = courses.find((c) => c.id === parseInt(req.params.id));
	if (!course)
		return res.status(404).send("The course with the given ID was not found");
	res.send(course);
});

app.post("/api/courses", (req, res) => {
	const { error } = validateCourse(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const course = {
		id: courses.length + 1,
		name: req.body.name,
	};
	courses.push(course);
	res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
	// Look up the course
	const course = courses.find((c) => c.id === parseInt(req.params.id));
	// If not existing, return 404
	if (!course)
		return res.status(404).send("The course with the given ID was not found");

	// Validate the course
	const { error } = validateCourse(req.body);
	// If invalid, return 400 - Bad request
	if (error) return res.status(400).send(error.details[0].message);
	// Update course
	course.name = req.body.name;
	// Return the updated course
	res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
	// Look up the course
	const course = courses.find((c) => c.id === parseInt(req.params.id));
	// If not existing, return 404
	if (!course)
		return res.status(404).send("The course with the given ID was not found");

	// Delete
	const index = courses.indexOf(course);
	courses.splice(index, 1);

	// Return the same course
	res.send(course);
});

function validateCourse(course) {
	const schema = {
		name: Joi.string().min(3).required(),
	};

	return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
