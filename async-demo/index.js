console.log("Before");
// CALLBACK-based approach
// getUser(1, (user) => {
// 	getRepositories(user.gitHubUsername, (repos) => {
// 		getCommits(repos[0], (commits) => {
// 			console.log(commits);
// 		});
// 	});
// });

// PROMISE-based approach
// getUser(1)
// 	.then((user) => getRepositories(user.gitHubUsername))
// 	.then((repos) => getCommits(repos[0]))
// 	.then((commits) => console.log("Commits", commits))
// 	.catch((err) => console.log("Error", err.message));

// ASYNC AND AWAIT-based approach
async function displayCommits() {
	try {
		const user = await getUser(1);
		const repos = await getRepositories(user.gitHubUsername);
		const commits = await getCommits(repos[0]);
		console.log(commits);
	} catch (err) {
		console.log("Error", err.message);
	}
}

displayCommits();

console.log("After");

function getUser(id) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("Reading a user from a database...");
			resolve({ id: id, gitHubUsername: "mosh" });
		}, 2000);
	});
}

function getRepositories(username) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("Calling GitHub API to get Repos...");
			reject(new Error("Could not get the repos."));
			// resolve(["repo1", "repo2", "repo3"]);
		}, 2000);
	});
}

function getCommits(repo) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("Calling GitHub API to get Commits...");
			resolve(["commit1", "commit2", "commit3"]);
		}, 2000);
	});
}
