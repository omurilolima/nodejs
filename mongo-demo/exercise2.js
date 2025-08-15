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
    // Get all the published front end and backend courses
    // Sort by price in descending order
    // Select only the name, author and price fields
    // return the list of courses
    return await Course
        // .find({ isPublished: true, tags: { $in:['backend', 'frontend']} }) // Filter for published backend courses
        .find({ isPublished: true })
        .or([{ tags: 'frontend' }, { tags: 'backend' }]) // Filter for frontend or backend
        .sort('-price') // Sort by price in descending order
        .select("name author price"); // Select only the name, author and price fields
};

// Display the courses
async function run() {
    const courses = await getCourses();
    console.log(courses);
}

run()
    .then(() => mongoose.disconnect())
    .catch(err => console.error('Error:', err));
