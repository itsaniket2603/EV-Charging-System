const Charger = require('../models/charger')

// Get all chargers
exports.getAllChargers = async (req, res) => {
  try {
    const chargers = await Charger.find()
    res.json(chargers)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// Get a single charger
exports.getChargerById = async (req, res) => {
  try {
    const charger = await Charger.findById(req.params.id)
    if (!charger) return res.status(404).json({ message: 'Not found' })
    res.json(charger)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// Create new charger
exports.createCharger = async (req, res) => {
  try {
    const charger = new Charger(req.body)
    await charger.save()
    res.status(201).json(charger)
  } catch (error) {
    res.status(500).json({ message: 'Failed to add charger', error: error.message })
  }
}

// Update charger
exports.updateCharger = async (req, res) => {
  try {
    const charger = await Charger.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(charger)
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message })
  }
}

// Delete charger
exports.deleteCharger = async (req, res) => {
  try {
    await Charger.findByIdAndDelete(req.params.id)
    res.json({ message: 'Charger deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Delete failed' })
  }
}
