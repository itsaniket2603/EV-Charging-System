// const mongoose = require('mongoose');

// const chargingStationSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   location: {
//     latitude: { type: Number, required: true },
//     longitude: { type: Number, required: true },
//   },
//   type: { type: String, default: 'Type-2' }, // example field
//   status: { type: String, default: 'Available' },
// }, { timestamps: true });

// module.exports = mongoose.model('ChargingStation', chargingStationSchema);
const mongoose = require('mongoose');

const chargingStationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  type: { type: String, default: 'Type-2' }, // station type (optional)
  status: { type: String, default: 'Available' }, // Available, In Use, etc.
  powerOutput: { type: Number, required: true }, // in kilowatts
  connectorType: { type: String, required: true }, // e.g. CCS, Type-2, CHAdeMO
}, { timestamps: true });

module.exports = mongoose.model('ChargingStation', chargingStationSchema);

