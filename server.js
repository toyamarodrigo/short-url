// Require
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Init
const app = express();

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database Key
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected.'))
  .catch((err) => console.log(err));

// Routes
const shorten = require('./routes/api/shorten');
app.use('/api/shorten', shorten);

const redirect = require('./routes/api/redirect');
app.use('/api/redirect', redirect);

app.get('/:hash', (req, res) => {
  const id = req.params.hash;
  console.log(id);
});

// Path
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
