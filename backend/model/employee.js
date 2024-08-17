const mongoose = require('mongoose');

// Define the schema for employee
const employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    department: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    }
});

// Create the model from the schema
const employeeModel = mongoose.model('Employee', employeeSchema);

module.exports = employeeModel;
