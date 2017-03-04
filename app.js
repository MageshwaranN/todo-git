const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/db');

// Connect mongoose
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log(`MongoDB Connected : ${config.database}`);
});

mongoose.connection.on('error', (error) => {
    console.log(`MongoDB error : ${error}`);
});

const app = express();

// Routes
const users = require('./routes/users');
const tasks = require('./routes/tasks');

const port = process.env.PORT || 3000;

// Used for Authentication on disable some routs;
app.use(cors());

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Registering Routes
app.use('/users', users);
app.use('/api', tasks);

// Index Route
app.get('/', (req, res) => {
    res.send("Invalid Endpoint");
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server

app.listen(port, () => {
    console.log(`Express Server Running on port : ${port}`);
});