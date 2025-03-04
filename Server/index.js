const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (uploads folder)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const dbConnect = require('./models/dbConnect');
dbConnect();

// Routes
const userRouter = require('./routers/userRouter');
app.use('/', userRouter);

const adminRouter = require('./routers/adminRouter');
app.use('/admin', adminRouter);

// Start server
app.listen(8500, () => {
  console.log('Server running at http://localhost:8500');
});
