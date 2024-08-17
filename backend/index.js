const express = require('express');
const app = express();
const port = 7000;
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoute=require('./routes/auth')
const productroute=require('./routes/productroute')
// Import model
const employeeModel = require('./model/employee');

// Middleware
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use(cors())
// rotes

app.use('/api/v1', authRoute);
app.use('/api/v1/product',productroute)


// Connect to database
mongoose.connect('mongodb://localhost:27017/company')
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
  });

// Routes
app.get('/', (req, res) => {
  res.send("Hello");
});

// Create - POST
app.post('/postdata', (req, res) => {
  const { name, email, department, salary } = req.body;

  employeeModel.create({ name, email, department, salary })
    .then((employee) => {
      res.status(201).send(employee);
      console.log(employee);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error creating employee");
    });
});

// Read - GET
app.get('/getdata', (req, res) => {
  employeeModel.find()
    .then((employees) => {
      res.send(employees);
      console.log(employees);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error fetching employees");
    });
});

// Read by ID - GET
app.get('/getdatabyid/:id', (req, res) => {
  const id = req.params.id;
  employeeModel.findById({ _id: id })
    .then((employee) => {
      res.send(employee);
      console.log("Data retrieved successfully");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Update - PUT
app.put('/updatedata/:id', (req, res) => {
  const id = req.params.id;
  const { name, email, department, salary } = req.body;
  employeeModel.findByIdAndUpdate(id, { name, email, department, salary }, { new: true })
    .then((employee) => {
      res.send(employee);
      console.log("Updated successfully");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Delete - DELETE
app.delete('/deletedata/:id', (req, res) => {
  const id = req.params.id;
  employeeModel.findByIdAndDelete({ _id: id })
    .then(() => {
      res.send("Deleted successfully");
      console.log("Deleted successfully");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
