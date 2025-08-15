// Start the MongoDB server before running this script
// Use the command: mongod

const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost/playground")
	.then(() => console.log("Connected to MongoDB..."))
	.catch((err) => console.log("Could not connect to MongoDB...", err));

// SCHEMA (It is specific to Mongoose, it's not part of MongoDB)
// We use a schema in Mangoose to define the shape of documents in a MongoDB collection.

const courseSchema = new mongoose.Schema({
	name: { 
		type: String, 
		required: true,
		minlength: 5, // Minimum length of the name
		maxlength: 255, // Maximum length of the name
		// match: /pattern/ // Regular expression pattern to validate the name 
	},
	category: {
		type: String,
		required: true,
		enum: ['web', 'mobile', 'network'], // The category must be one of the specified values
	},
	author: String,
	tags: [ String ],
	date: { type: Date, default: Date.now },
	isPublished: Boolean,
	price: {
		type: Number,
		required: function() { return this.isPublished; }, // Price is required if the course is published
		min: 10, // Minimum price
		max: 200 // Maximum price
	}
})

const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
	// Create a course
	const course = new Course({
		name: 'Mongo Course',
		category: '-',
		author: 'Murilo Lima',
		tags: ['angular', 'frontend'],
		isPublished: true,
		price: 15,
	})
	
	try {
		// Save the course to the database
		const result = await course.save()
		console.log(result);
	} catch (error) {
		// If there is an error, log the error message
		console.log('Error creating course:', error.message);
	}
}

async function getCourses(){
	// Pagination
    const pageNumber = 2
    const pageSize = 10
	const courses = await Course
        // Get the documents in a given page
        .find({ author: 'Mosh', isPublished: true }) // Courses by authors whose name starts with 'Mosh' and are published
        .skip((pageNumber - 1) * pageSize) // Skip the first (pageNumber - 1) * pageSize items
        .limit(pageSize) // Limit the result to pageSize items
		.sort({ name: 1 }) // Sort by name in ascending order
        .select({ name: 1, tags: 1 }) // Select only the name and tags fields
	console.log(courses);
}

async function updateCourse(id){
	// const result = await Course.updateOne({_id: id}, {
	const course = await Course.findByIdAndUpdate(id, {
		// Update the course with the given id
		$set: {
			author: 'Murilo Lima',
			isPublished: false
		} 
	}, { new: true }); // new: true option returns the updated document instead of the original document
	console.log(course);
}

async function removeCourse(id){
	// Remove a course by id
	// const result = await Course.deleteOne({_id: id})
	// Find the course by id and remove it
	const course = await Course.findByIdAndRemove(id);
	console.log(result);
}

createCourse();