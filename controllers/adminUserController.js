const db = require("../config/db");

// Fetch all admin users
const getAdmins = (req, res) => {
  const query = "SELECT id, name, email, role, created_at FROM admin_users"; // Exclude password
  db.query(query, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to fetch users" });
    }
    res.status(200).json(results);
  });
};

// Add new admin user
const addAdmin = (req, res) => {
  const { name, email, password, role = 'staff' } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email and password are required" });
  }

  // First check if email exists
  db.query(
    "SELECT id FROM admin_users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length > 0) {
        return res.status(409).json({ error: "Email already exists" });
      }

      // Insert new user
      db.query(
        "INSERT INTO admin_users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [name, email, password, role],
        (err, result) => {
          if (err) {
            console.error("Insert error:", err);
            return res.status(500).json({ error: "Failed to create user" });
          }
          
          // Return the created user (without password)
          db.query(
            "SELECT id, name, email, role, created_at FROM admin_users WHERE id = ?",
            [result.insertId],
            (err, userResults) => {
              if (err || userResults.length === 0) {
                return res.status(201).json({ 
                  id: result.insertId,
                  name,
                  email,
                  role
                });
              }
              res.status(201).json(userResults[0]);
            }
          );
        }
      );
    }
  );
};

// Update admin user
const updateAdmin = (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  db.query(
    "UPDATE admin_users SET name = ?, email = ?, role = ? WHERE id = ?",
    [name, email, role, id],
    (err, result) => {
      if (err) {
        console.error("Update error:", err);
        return res.status(500).json({ error: "Failed to update user" });
      }
      res.status(200).json({ message: "User updated successfully" });
    }
  );
};

// Delete admin user
const deleteAdmin = (req, res) => {
  const { id } = req.params;
  
  db.query(
    "DELETE FROM admin_users WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("Delete error:", err);
        return res.status(500).json({ error: "Failed to delete user" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    }
  );
};

module.exports = {
  getAdmins,
  addAdmin,
  updateAdmin,
  deleteAdmin
};