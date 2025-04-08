const express = require("express");
const router = express.Router();
const { getDepartments, addDepartment, updateDepartment, deleteDepartment } = require("../controllers/departmentController");

// Define the routes for departments
router.get("/", getDepartments); // Fetch all departments
router.post("/", addDepartment); // Add a new department
router.put("/:id", updateDepartment); // Update a department
router.delete("/:id", deleteDepartment); // Delete a department

module.exports = router;