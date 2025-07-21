// Express documentation: https://expressjs.com/en/5x/api.html

const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
	res.send([1, 2, 3]);
});

app.get("/api/courses/:id", (req, res) => {
	res.send(req.params.id);
});

// Use route parameters (e.g. posts/2018/1) for essential or required values
// Use query string parameters (e.g. ?sortBy=name) for anything that is optional

app.get("/api/posts/:year/:month", (req, res) => {
	// For getting route parameters
	// res.send(req.params);

	// For getting query string parameters
	res.send(req.query);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
