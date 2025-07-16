const path = require("path");
// The path.parse() method returns an object whose properties represent significant elements of the path.
// more at https://nodejs.org/docs/latest/api/path.html#pathparsepath
var pathObj = path.parse(__filename);

console.log(pathObj);
