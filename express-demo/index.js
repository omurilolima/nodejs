// NPM Pug: https://www.npmjs.com/package/pug
// 		Pug is a high performance template engine heavily
// 		influenced by Haml and implemented with JavaScript for Node.js and browsers.
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");

const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("joi");
const logger = require("./middleware/logger");
const auth = require("./middleware/auth");
const courses = require("./routes/courses");
const home = require("./routes/home");
const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views"); // default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("api/courses", courses);
app.use("/", home);

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
