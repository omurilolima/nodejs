// More on Update Operators: https://www.mongodb.com/pt-br/docs/manual/reference/operator/update/

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

updateCourse('689f665b1046ebddbdb28f5f')
