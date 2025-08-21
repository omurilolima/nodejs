const Joi = require("joi"); // Importing Joi for validation
const express = require("express"); // Importing Express framework
const mongoose = require("mongoose"); // Importing Mongoose for MongoDB interaction
const router = express.Router(); // Creating a new router instance

// Defining a new schema and model for Customer
const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));

// Getting all customers
router.get("/", async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

// Posting a new customer
router.post("/", async (req, res) => {

    // Validating the request body
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Creating a new customer instance
    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    // Saving the customer to the database
    customer = await customer.save();
    // Sending the created customer as a response
    res.send(customer);

});

// Route to update an existing genre
// Validates the request body, finds the genre by ID, updates its name, and returns the updated genre
// If the genre is not found, it returns a 404 error
router.put("/:id", async (req, res) => {
    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    }, { new: true }); // { new: true } returns the updated document

    if (!customer) return res.status(404).send("The customer with the given ID was not found.");

    // Validating the request body
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Sending the updated customer as a response
    res.send(customer);
});

// Route to delete a customer by ID
// Finds the customer by ID, removes it from the database, and returns the deleted customer
router.delete("/:id", async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send("The customer with the given ID was not found.");

    // Sending the deleted customer as a response
    res.send(customer);
});

// Route to get a customer by ID
// Finds the customer by ID and returns it 
router.get("/:id", async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send("The customer with the given ID was not found.");
    res.send(customer);
});

function validateCustomer(customer) {
	const schema = {
		name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
	};

	return Joi.validate(customer, schema);
}
