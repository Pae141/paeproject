const cors = require('cors');
const express = require('express');
const app = express();
require('dotenv').config();

const userRoutes = require('./routes/users');

app.use(express.json());

// CORS config
app.use(cors({
  origin: 'https://pae141.github.io',
  credentials: true,
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://pae141.github.io');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
console.log(`Starting server on port ${PORT}...`);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
