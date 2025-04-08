const db = require("../config/db");

// Fetch all departments
const getDepartments = (req, res) => {
  const query = "SELECT * FROM departments";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error fetching departments", error: err });
    } else {
      res.status(200).json(results);
    }
  });
};

// Add a new department
const addDepartment = (req, res) => {
  const { name, head, contact_email } = req.body;
  const query = "INSERT INTO departments (name, head, contact_email) VALUES (?, ?, ?)";
  db.query(query, [name, head, contact_email], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error adding department", error: err });
    } else {
      res.status(201).json({ id: result.insertId, name, head, contact_email });
    }
  });
};

// Update a department
const updateDepartment = (req, res) => {
  const { id } = req.params;
  const { name, head, contact_email } = req.body;
  const query = "UPDATE departments SET name = ?, head = ?, contact_email = ? WHERE id = ?";
  db.query(query, [name, head, contact_email, id], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error updating department", error: err });
    } else {
      res.status(200).json({ message: "Department updated successfully" });
    }
  });
};

// Delete a department
const deleteDepartment = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM departments WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error deleting department", error: err });
    } else {
      res.status(200).json({ message: "Department deleted successfully" });
    }
  });
};

module.exports = { getDepartments, addDepartment, updateDepartment, deleteDepartment };