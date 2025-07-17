// HTTP Module
// More at https://nodejs.org/docs/latest/api/http.html

const http = require("http");

const server = http.createServer((request, response) => {
	if (request.url === "/") {
		response.write("Hello World");
		response.end();
	}

	if (request.url === "/api/courses") {
		response.write(JSON.stringify([1, 2, 3]));
		response.end();
	}
});

server.listen(3000);

console.log("Listening on port 3000...");
// on browser access: localhost:3000 to see the "Hello World"
// on browser access: localhost:3000/api/courses to see the JSON to string
