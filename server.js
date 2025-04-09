const announcementRoutes = require("./routes/notificationsRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const adminUserRoutes = require("./routes/adminUserRoutes");
const logRoutes = require("./routes/logRoutes");
const alertsRoutes = require("./routes/alertsRoutes");
const ticketsRoutes = require("./routes/ticketsRoutes");
const auditTrailRoutes = require("./routes/auditTrailRoutes");
const notificationsRoutes = require("./routes/notificationsRoutes");
const patientRoutes = require('./routes/patientsRoutes'); 
const patientsController = require('./controllers/patientsController');
const doctorsRoutes = require('./routes/doctorsRoutes');

//new
const labTestQueueRoutes = require('./routes/labTestQueueRoutes');
const labTestResultsRoutes = require('./routes/labTestResultsRoutes');
const labCriticalFlagsRoutes = require('./routes/labCriticalFlagsRoutes');
const labSampleTrackingRoutes = require('./routes/labSampleTrackingRoutes');
const labReportLogsRoutes = require('./routes/labReportLogsRoutes');
const labEquipmentStatusRoutes = require('./routes/labEquipmentStatusRoutes');
const labBarcodeScansRoutes = require('./routes/labBarcodeScansRoutes');
const labTechnicianActionsRoutes = require('./routes/labTechnicianActionsRoutes');
const labPatientHistoryRoutes = require('./routes/labPatientHistoryRoutes');
const labSettingsRoutes = require('./routes/labSettingsRoutes');

// accountant routes
const budgetsRoutes = require('./routes/budgetsRoutes');
const payrollsRoutes = require('./routes/payrollsRoutes');
const billingRoutes = require('./routes/billingRoutes');
const financialReportsRoutes = require('./routes/financialReportsRoutes');
const auditsRoutes = require('./routes/auditsRoutes');
const suppliersRoutes = require('./routes/suppliersRoutes');
const accountantNotificationsRoutes = require('./routes/accountantNotificationsRoutes');
const mobileMoneyTransactionsRoutes = require('./routes/mobileMoneyTransactionsRoutes');

// cashier routes
const cashierPaymentsRoutes = require('./routes/payments_handled_by_cashierRoutes');
const cashierReceiptsRoutes = require('./routes/issued_receiptsRoutes');
const cashierTransactionsRoutes = require('./routes/cashier_daily_transactionsRoutes');
const cashierRefundLogsRoutes = require('./routes/cashier_refund_logsRoutes');
const cashierNotificationsRoutes = require('./routes/cashier_specific_notificationsRoutes');

// New imports for System Administration Dashboard routes
const auditRoutes = require("./routes/auditRoutes");
const backupsRoutes = require("./routes/backupsRoutes");
const capacityRoutes = require("./routes/capacityRoutes");
const incidentsRoutes = require("./routes/incidentsRoutes");
const roleNotificationsRoutes = require("./routes/roleNotificationsRoutes");

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Updated Database connection - import from config/db.js
const db = require("./config/db");

// Add error handling for uncaught exceptions and unhandled rejections
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Add health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Existing login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Query execution error:", err);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }

    if (results.length > 0) {
      res.status(200).json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid username or password" });
    }
  });
});

// Role-based login endpoint
app.post("/api/role-login", (req, res) => {
  const { role, username, password } = req.body;

  if (!role || !username || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const query = "SELECT * FROM role_logins WHERE username = ? AND password = ? AND role = ?";
  db.query(query, [username, password, role], (err, results) => {
    if (err) {
      console.error("Query execution error:", err);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }

    if (results.length > 0) {
      res.status(200).json({ success: true, message: `Login successful as ${role}` });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials or role mismatch" });
    }
  });
});

// Register a new patient
app.post("/api/register-patient", (req, res) => {
  const { name, contact, insurance, medical_history, demographic_data } = req.body;

  if (!name || !contact) {
    return res.status(400).json({ success: false, message: "Name and contact are required." });
  }

  const query =
    "INSERT INTO patients (name, contact, insurance, medical_history, demographic_data) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [name, contact, insurance, medical_history, demographic_data], (err, results) => {
    if (err) {
      console.error("Error registering patient:", err);
      return res.status(500).json({ success: false, message: "Error registering patient." });
    }

    res.status(200).json({ success: true, message: "Patient registered successfully!", patient_id: results.insertId });
  });
});

// Manage appointments
app.post("/api/manage-appointments", (req, res) => {
  const { patient, doctor, scheduled_time, status } = req.body;

  if (!patient || !doctor || !scheduled_time) {
    return res.status(400).json({ success: false, message: "Patient, doctor, and scheduled time are required." });
  }

  const query =
    "INSERT INTO appointments (patient, doctor, scheduled_time, status) VALUES (?, ?, ?, ?)";
  db.query(query, [patient, doctor, scheduled_time, status || "Scheduled"], (err, results) => {
    if (err) {
      console.error("Error managing appointment:", err);
      return res.status(500).json({ success: false, message: "Error managing appointment." });
    }

    res.status(200).json({
      success: true,
      message: "Appointment created successfully!",
      appointment_id: results.insertId,
    });
  });
});

// Get all appointments
app.get("/api/appointments", (req, res) => {
  const query = "SELECT * FROM appointments";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching appointments:", err);
      return res.status(500).json({ success: false, message: "Error fetching appointments" });
    }
    res.status(200).json(results);
  });
});

// Update an appointment
app.put("/api/appointments/:id", (req, res) => {
  const { id } = req.params;
  const { patient, doctor, scheduled_time, status } = req.body;

  if (!patient || !doctor || !scheduled_time) {
    return res.status(400).json({ success: false, message: "Patient, doctor, and scheduled time are required." });
  }

  const query =
    "UPDATE appointments SET patient = ?, doctor = ?, scheduled_time = ?, status = ? WHERE appointment_id = ?";
  db.query(query, [patient, doctor, scheduled_time, status || "Scheduled", id], (err, results) => {
    if (err) {
      console.error("Error updating appointment:", err);
      return res.status(500).json({ success: false, message: "Error updating appointment" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }
    res.status(200).json({ success: true, message: "Appointment updated successfully" });
  });
});

// Delete an appointment
app.delete("/api/appointments/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM appointments WHERE appointment_id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error deleting appointment:", err);
      return res.status(500).json({ success: false, message: "Error deleting appointment" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }
    res.status(200).json({ success: true, message: "Appointment deleted successfully" });
  });
});

// Log visitors
app.post("/api/log-visitor", (req, res) => {
  const { name, contact, department, pass_issued } = req.body;

  if (!name || !department) {
    return res.status(400).json({ success: false, message: "Name and department are required." });
  }

  const query =
    "INSERT INTO visitor_logs (name, contact, entry_time, department, pass_issued) VALUES (?, ?, NOW(), ?, ?)";
  db.query(query, [name, contact, department, pass_issued ?? 1], (err, results) => {
    if (err) {
      console.error("Error logging visitor:", err);
      return res.status(500).json({ success: false, message: "Error logging visitor." });
    }

    db.query("SELECT entry_time FROM visitor_logs WHERE visitor_id = ?", [results.insertId], (err, entryResult) => {
      if (err) {
        console.error("Error fetching entry time:", err);
        return res.status(500).json({ success: false, message: "Error fetching entry time." });
      }

      res.status(200).json({
        success: true,
        message: "Visitor logged successfully!",
        visitor_id: results.insertId,
        entry_time: entryResult[0].entry_time,
      });
    });
  });
});

// Get all visitor logs
app.get("/api/visitor-logs", (req, res) => {
  const query = "SELECT * FROM visitor_logs";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching visitor logs:", err);
      return res.status(500).json({ success: false, message: "Error fetching visitor logs" });
    }
    res.status(200).json(results);
  });
});

// Delete a visitor log
app.delete("/api/visitor-logs/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM visitor_logs WHERE visitor_id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error deleting visitor log:", err);
      return res.status(500).json({ success: false, message: "Error deleting visitor log" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Visitor log not found" });
    }
    res.status(200).json({ success: true, message: "Visitor log deleted successfully" });
  });
});

// Get all patients
app.get("/api/patients", (req, res) => {
  const query = "SELECT * FROM patients";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching patients:", err);
      return res.status(500).json({ success: false, message: "Error fetching patients" });
    }
    res.status(200).json(results);
  });
});

// Update a patient
app.put("/api/patients/:id", (req, res) => {
  const { id } = req.params;
  const { name, contact, insurance, medical_history, demographic_data } = req.body;

  if (!name || !contact) {
    return res.status(400).json({ success: false, message: "Name and contact are required." });
  }

  const query =
    "UPDATE patients SET name = ?, contact = ?, insurance = ?, medical_history = ?, demographic_data = ? WHERE patient_id = ?";
  db.query(query, [name, contact, insurance, medical_history, demographic_data, id], (err, results) => {
    if (err) {
      console.error("Error updating patient:", err);
      return res.status(500).json({ success: false, message: "Error updating patient" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }
    res.status(200).json({ success: true, message: "Patient updated successfully" });
  });
});

// Delete a patient
app.delete("/api/patients/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM patients WHERE patient_id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error deleting patient:", err);
      return res.status(500).json({ success: false, message: "Error deleting patient" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }
    res.status(200).json({ success: true, message: "Patient deleted successfully" });
  });
});

// ====== NEWLY ADDED MISSING ENDPOINTS ======
// Get all roles
app.get("/api/roles", (req, res) => {
  const query = "SELECT * FROM roles";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching roles:", err);
      return res.status(500).json({ success: false, message: "Error fetching roles" });
    }
    res.status(200).json(results);
  });
});

// Get all permissions
app.get("/api/permissions", (req, res) => {
  const query = "SELECT * FROM permissions";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching permissions:", err);
      return res.status(500).json({ success: false, message: "Error fetching permissions" });
    }
    res.status(200).json(results);
  });
});

// Get system logs
app.get("/api/logs", (req, res) => {
  const query = "SELECT * FROM system_logs";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching system logs:", err);
      return res.status(500).json({ success: false, message: "Error fetching system logs" });
    }
    res.status(200).json(results);
  });
});

// Get alerts
app.get("/api/alerts", (req, res) => {
  const query = "SELECT * FROM alerts";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching alerts:", err);
      return res.status(500).json({ success: false, message: "Error fetching alerts" });
    }
    res.status(200).json(results);
  });
});

// Get tickets
app.get("/api/tickets", (req, res) => {
  const query = "SELECT * FROM support_tickets";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching tickets:", err);
      return res.status(500).json({ success: false, message: "Error fetching tickets" });
    }
    res.status(200).json(results);
  });
});

// Get performance metrics
app.get("/api/performance", (req, res) => {
  const query = "SELECT * FROM performance_metrics";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching performance metrics:", err);
      return res.status(500).json({ success: false, message: "Error fetching performance metrics" });
    }
    res.status(200).json(results);
  });
});

// Get audit logs (alternative to /api/audit-trail)
app.get("/api/audit-logs", (req, res) => {
  const query = "SELECT * FROM audit_logs";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching audit logs:", err);
      return res.status(500).json({ success: false, message: "Error fetching audit logs" });
    }
    res.status(200).json(results);
  });
});

// Get notifications
app.get("/api/notifications", (req, res) => {
  const query = "SELECT * FROM notifications";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching notifications:", err);
      return res.status(500).json({ success: false, message: "Error fetching notifications" });
    }
    res.status(200).json(results);
  });
});

// Get capacity metrics
app.get("/api/capacity-metrics", (req, res) => {
  const query = "SELECT * FROM capacity_metrics";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching capacity metrics:", err);
      return res.status(500).json({ success: false, message: "Error fetching capacity metrics" });
    }
    res.status(200).json(results);
  });
});

// Register routes for new APIs
app.use("/api/admin_users", adminUserRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/notifications", notificationsRoutes);

//cashier routes
app.use('/api/cashier_payments', cashierPaymentsRoutes);
app.use('/api/cashier_receipts', cashierReceiptsRoutes);
app.use('/api/cashier_daily_transactions', cashierTransactionsRoutes);
app.use('/api/cashier_refund_logs', cashierRefundLogsRoutes);
app.use('/api/cashier_notifications', cashierNotificationsRoutes);

// Register new routes for System Administration features
app.use("/api/audit-trail", auditRoutes);
app.use("/api/backups", backupsRoutes);
app.use("/api/capacity", capacityRoutes);
app.use("/api/incidents", incidentsRoutes);
app.use("/api/role-notifications", roleNotificationsRoutes);
app.use("/api/patients", patientRoutes);
app.use('/api/doctors', doctorsRoutes);

//new routes
app.use("/api/logs", logRoutes);
app.use("/api/alerts", alertsRoutes);
app.use("/api/tickets", ticketsRoutes);
app.use("/api/audit_trail", auditTrailRoutes);
app.use("/api/role-notifications", roleNotificationsRoutes);

// accountant routes
app.use('/api/budgets', budgetsRoutes);
app.use('/api/payrolls', payrollsRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/financial-reports', financialReportsRoutes);
app.use('/api/audits', auditsRoutes);
app.use('/api/suppliers', suppliersRoutes);
app.use('/api/accountant-notifications', accountantNotificationsRoutes);
app.use('/api/mobile-money-transactions', mobileMoneyTransactionsRoutes);

//new
app.use('/api/lab-test-queue', labTestQueueRoutes);
app.use('/api/lab-test-results', labTestResultsRoutes);
app.use('/api/lab-critical-flags', labCriticalFlagsRoutes);
app.use('/api/lab-sample-tracking', labSampleTrackingRoutes);
app.use('/api/lab-report-logs', labReportLogsRoutes);
app.use('/api/lab-equipment-status', labEquipmentStatusRoutes);
app.use('/api/lab-barcode-scans', labBarcodeScansRoutes);
app.use('/api/lab-technician-actions', labTechnicianActionsRoutes);
app.use('/api/lab-patient-history', labPatientHistoryRoutes);
app.use('/api/lab-settings', labSettingsRoutes);

app.get("/api/patients", async (req, res) => {
  const patients = await db.query("SELECT * FROM patients");
  res.json(patients);
});

app.get("/api/appointments", async (req, res) => {
  const appointments = await db.query("SELECT * FROM appointments");
  res.json(appointments);
});

app.get("/api/doctors", async (req, res) => {
  const doctors = await db.query("SELECT * FROM doctors");
  res.json(doctors);
});

// Starting the server with dynamic port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));