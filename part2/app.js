const express = require('express');
const path = require('path');
const session = require('express-session'); 
require('dotenv').config();

const app = express();

app.use(session({
  secret: 'dogwalksecret',
  resave: false,
  saveUninitialized: true
}));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// Export the app instead of listening here
module.exports = app;

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Logout failed');
    }
    res.clearCookie('connect.sid');
    res.status(200).send('Logged out');
  });
});


const PORT = process.env.PORT || 3000;
