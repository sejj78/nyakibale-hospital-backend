const Pharmacist = require('../models/pharmacist');

// Create a new pharmacist
exports.createPharmacist = async (req, res) => {
  try {
    const { name, email, phone_number, address } = req.body;
    const pharmacist = await Pharmacist.create({ name, email, phone_number, address });
    res.status(201).json(pharmacist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all pharmacists
exports.getAllPharmacists = async (req, res) => {
  try {
    const pharmacists = await Pharmacist.findAll();
    res.status(200).json(pharmacists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single pharmacist by ID
exports.getPharmacistById = async (req, res) => {
  try {
    const pharmacist = await Pharmacist.findByPk(req.params.id);
    if (pharmacist) {
      res.status(200).json(pharmacist);
    } else {
      res.status(404).json({ message: 'Pharmacist not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a pharmacist
exports.updatePharmacist = async (req, res) => {
  try {
    const pharmacist = await Pharmacist.findByPk(req.params.id);
    if (pharmacist) {
      const { name, email, phone_number, address } = req.body;
      await pharmacist.update({ name, email, phone_number, address });
      res.status(200).json(pharmacist);
    } else {
      res.status(404).json({ message: 'Pharmacist not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a pharmacist
exports.deletePharmacist = async (req, res) => {
  try {
    const pharmacist = await Pharmacist.findByPk(req.params.id);
    if (pharmacist) {
      await pharmacist.destroy();
      res.status(200).json({ message: 'Pharmacist deleted successfully' });
    } else {
      res.status(404).json({ message: 'Pharmacist not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
