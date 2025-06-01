const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createStation,
  getStations,
  getStationById,
  updateStation,
  deleteStation
} = require('../controllers/stationController');

router.use(auth); // Protect all routes below

router.post('/', createStation);
router.get('/', getStations);
router.get('/:id', getStationById);
router.put('/:id', updateStation);
router.delete('/:id', deleteStation);

module.exports = router;
