// Promise is an object that holds the eventual result o an  asynchronous operation.
// Initially, it's in the pending state, when we create this promise. At this point, it
// picks up an asynchronous operation, that operation can complete sucessfully or
//  it can fail. If completes successfully, we can say the promise is resolve, or fulfilled.
// So the state of this promise changes from pending to resolved or fulfilled.
// If it fails, the state of the promise will go from pending to rejected

const p = new Promise((resolve, reject) => {
	// Kick off some async work
	setTimeout(() => {
		reject(new Error("message")); // pending => rejected
		// resolve(1);         // pending => fulfilled
	}, 2000);
});

p.then((result) => console.log("Result:", result)).catch((err) =>
	console.log("Error", err.message)
);
