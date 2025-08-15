const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost/mongo-exercises")
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.log("Could not connect to MongoDB...", err));

// SCHEMA
const courseSchema = new mongoose.Schema({
    tags: [String],
    data: { type: Date, default: Date.now },
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number,
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses(){
    // Get all the published backend courses
    // sort them by their name
    // pick only their name and author fields
    // return the list of courses
    return await Course
        .find({ isPublished: true, tags: 'backend' }) // Filter for published backend courses
        .sort({name: 1}) // Sort by name in ascending order
        .select({ name: 1, author: 1 }); // Select only the name and author fields
};

// Display the courses
async function run() {
    const courses = await getCourses();
    console.log(courses);
}

run()
    .then(() => mongoose.disconnect())
    .catch(err => console.error('Error:', err));
