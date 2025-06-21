const express = require('express');
const path = require('path');
const session = require('express-session'); // ✅ 加这一行
require('dotenv').config();

const app = express();

// ✅ 配置 session 中间件
app.use(session({
  secret: 'dogwalksecret', // 可以换成任意密钥
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});

