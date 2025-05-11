const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Base Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Add this line back to enable /api/jobs route
app.use('/api/jobs', require('./routes/jobRoutes')); // ✅ UNCOMMENTED

// You can uncomment these later when applicationRoutes is ready
// app.use('/api/applications', require('./routes/applicationRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
