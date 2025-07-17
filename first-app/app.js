const Logger = require("./logger");
const logger = new Logger();

// Register a listener
logger.on("messageLogged", (arg) => {
	console.log("Listerner called", arg);
});

logger.log("message");
