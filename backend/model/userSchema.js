const mongoose = require('mongoose');

// Schema
const employeeSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    department: {
        type: String,
    },
    salary: {
        type: Number,
    }
});

// Model
const employeeModel = mongoose.model('employee', employeeSchema);
module.exports = employeeModel;
