const ChargingStation = require('../models/ChargingStation');

exports.createStation = async (req, res) => {
  try {
    const { name, location, type, status ,powerOutput, connectorType} = req.body;
    const station = new ChargingStation({ name, location, type, status, powerOutput ,connectorType});
    await station.save();
    res.status(201).json(station);
    
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getStations = async (req, res) => {
  try {
    const stations = await ChargingStation.find();
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getStationById = async (req, res) => {
  try {
    const station = await ChargingStation.findById(req.params.id);
    if (!station) return res.status(404).json({ message: 'Station not found' });
    res.json(station);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateStation = async (req, res) => {
  try {
    const station = await ChargingStation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!station) return res.status(404).json({ message: 'Station not found' });
    res.json(station);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteStation = async (req, res) => {
  try {
    const station = await ChargingStation.findByIdAndDelete(req.params.id);
    if (!station) return res.status(404).json({ message: 'Station not found' });
    res.json({ message: 'Station deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
