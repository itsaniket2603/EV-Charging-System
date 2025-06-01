const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv').config();


dotenv.config();

const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const stationRoutes = require('./routes/stationRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stations', stationRoutes);

app.get('/', (req, res) => {
  res.send('Aniket');
});

//Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// const express = require('express');
// const cors = require('cors');
// const app = express();

// app.use(cors()); // Allow cross-origin requests
// app.use(express.json()); // To parse JSON request body

// // Test route
// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// index.js or app.js



// 🟡 Add CORS configuration here
app.use(cors({
  origin: 'http://localhost:5173',  // Your Vue frontend URL
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // optional, only if using cookies or sessions
}));

app.use(express.json());

// Your other middleware and routes...
