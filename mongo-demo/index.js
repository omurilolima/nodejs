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
	tags: [ String ],
	date: { type: Date, default: Date.now },
	isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema);


async function createCourse(){
	// Create a course
	const course = new Course({
		name: 'Angular Course',
		author: 'Mosh',
		tags: ['angular', 'frontend'],
		isPublished: true
	})
	
	// Save the course to the database
	const result = await course.save()
	console.log(result);
}

async function getCourses(){
	// Get all courses
	const courses = await Course
		.find({ author: 'Mosh', isPublished: true })
		.limit(10) // Limit the number of results to 10
		.sort({ name: 1 }) // Sort by name in ascending order
		.select({ name: 1, tags: 1 }); // Select only name and tags fields
	console.log(courses);
}

getCourses();