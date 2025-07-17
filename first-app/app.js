// Working with Events Module
// More at https://nodejs.org/docs/latest/api/events.html

// A lot of Node core functionality is based on the concept of Events.
// An event is basically a signal that indicates that something has happened
// in our application. For exemple, in Node, we have a class called http that we
// can use to build a web server. So we listen on a given port, and every time we
// receive a request on that port, that http class reaises an event.  So our job is
// to read the request and return the right response.

// Event Emmitter Class
// https://nodejs.org/docs/latest/api/events.html#class-eventemitter

// The first letter is upper case because it is a class, not a function or simple value
const EventEmitter = require("events");
// In order to use this Event Emitter, first we need to create an instance of this class
const emitter = new EventEmitter();

// Register a listener that will be called every time an event is raised.
emitter.on("messageLogged", function () {
	console.log("Listener called");
});

// Raise an event
emitter.emit("messageLogged");
