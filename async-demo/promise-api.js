const p1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		console.log("Async operation 1...");
		resolve(1);
		// reject(new Error("Because something failed."));
	}, 2000);
});

const p2 = new Promise((resolve) => {
	setTimeout(() => {
		console.log("Async operation 2...");
		resolve(2);
	}, 2000);
});

// Wait for all the promises in the array to complete
//      Promise.all([p1, p2])
// 	        .then((result) => console.log(result))
// 	        .catch((error) => console.log("Error:", error.message));

// If you want to do something as soon as the first operation completes.
Promise.race([p1, p2])
	.then((result) => console.log(result))
	.catch((error) => console.log("Error:", error.message));
