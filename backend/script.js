const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const cors=require('cors');
const connectDatabase = require('./config/db');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const labsessionRoutes = require('./routes/LabSession');
const studentRoutes = require('./routes/student');

const app = express();
dotenv.config({path: path.join(__dirname, 'config' ,'config.env')})

app.use(bodyParser.json());
app.use(cors({ origin : process.env.ORIGIN, credentials : true }));
connectDatabase();

app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/labsession', labsessionRoutes);
app.use('/api/student', studentRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server listening to Port ${process.env.PORT}`);
})