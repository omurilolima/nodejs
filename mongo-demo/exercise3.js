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
    // Get all the published that are $15 or more
    // or have the word 'by' in their name
    // Sort by price in descending order
    // Select only the name, author and price fields
    // return the list of courses
    return await Course
        // .find({ isPublished: true, tags: { $in:['backend', 'frontend']} }) // Filter for published backend courses
        .find({ isPublished: true })
        .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }]) // Filter for courses that are $15 or more or have 'by' in their name and ignore case
        .sort('price') // Sort by price in descending order
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
