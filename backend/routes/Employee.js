const express = require("express");

const Router = express.Router();

//controller
const { getEmployeeDetails, createEmployee, editEmployee, deleteEmployee } = require("../controllers/employee");

//route to get employee details
Router.get("/employeeDetails", getEmployeeDetails);

Router.post("/createEmployee", createEmployee);

Router.put("/editEmployee/:id", editEmployee);

Router.delete("/deleteEmployee/:id", deleteEmployee);

module.exports = Router;