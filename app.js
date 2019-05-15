// Define Dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const appSetting = require('./config/app-setting');

// Connect to database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('connected to database => ' + config.database);
})

// On Error in Database
mongoose.connection.on('error', (err) => {
    console.log('Error in Database => ' + err);
})

// Initialize Express App
const app = express();

// Create Users Routes
const users = require('./routes/users');

// Port Number
console.log('appSetting.isProduction ->' ,appSetting.isProduction());
const port = appSetting.isProduction() ? (process.env.PORT || 8080) : 3000; // IN PRODUCTION

// CORS Middleware
app.use(cors());

// Set Static Folder 
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users',users);

//Index Router
app.get('/',(req,res) => {
    res.send('Invalid End-Point');
})

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname,'public/index.html'));
})

// Start Server
app.listen(port, () => {
    console.log('Server started @ ' + port);
})