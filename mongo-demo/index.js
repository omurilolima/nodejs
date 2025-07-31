const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost/playground")
	.then(() => console.log("Connected to MongoDB..."))
	.catch((err) => console.log("Could not connect to MongoDB...", err));

// SCHEMA (It is specific to Mongoose, it's not part of MongoDB)
// We use a schema in Mangoose to define the shape of documents in a MongoDB collection.

const courseSchema = new mongoose.Schema({
	name: String,
	author: String,
	tags: [String],
	date: { type: Date, default: Date.now },
	isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
	const course = new Course({
		name: "Angular Course",
		author: "Mosh",
		tags: ["angular", "backend"],
		isPublished: true,
	});

	const result = await course.save();
	console.log(result);
}

async function getCourses() {
	// or
	// and

	const courses = await Course
		// Starts with Murilo
		.find({ author: /^Murilo/ })
		// Ends with Murilo  // i = case insensitive
		.find({ author: /Murilo$/i })
		// Contains Murilo
		.find({ author: /.*Murilo.*/i })
		.limit(10)
		.sort({ name: 1 })
		.select({ name: 1, tags: 1 });
	console.log(courses);
}

getCourses();
