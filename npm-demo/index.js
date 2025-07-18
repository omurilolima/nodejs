var _ = require("underscore");

var result = _.contains([1, 2, 3, 4], 2);
console.log(result);

// For more packages, acess: https://www.npmjs.com/

// As the size o the node_modules folder can grow significantly.
// We should always list the node_modules folder in the .gitignore file
// To install all the dependencies of an existing project, run: "npm i"
//  With this, npm looks up our package.json file and download those
//  dependencies from npm registry.
