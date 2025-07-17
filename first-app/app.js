// Working with File System Module
// More at https://nodejs.org/docs/latest/api/fs.html

// Note that in this module almost every operation defined comes in two forms:
// synchronous or blocking and asynchronous or non blocking. For exemple we
// have "access" which is an asynchronous method and we also have "accessSync"
// which is a synchronous method. Now, even though we have these synchronous
// methods here, we shoul avoid using them.
// In a real world application we should use asynchronous methods, because these
// are non-blocking.

// A Node process has a single thread. If you're Node to build a backend for your
// application, you might have several hundreds or thousands of clients connecting
// to that backend. If you keep that single thread busy, you won't be able to
// serve many clients. So, always use asynchronous methods.

const fs = require("fs");

// E.g: "readdir" reads the contents of a directory.
fs.readdir("./", function (err, files) {
	if (err) console.log("Error", err);
	else console.log("Result", files);
});
