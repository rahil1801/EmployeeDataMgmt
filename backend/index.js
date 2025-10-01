const express = require('express');
const cors = require('cors');
const connectDb = require('./config/database');
const employeeRoutes = require('./routes/Employee');
require("dotenv").config();

const app = express();

if (process.env.CONNECT_DB !== 'false' && process.env.NODE_ENV !== 'test') {
    connectDb();
}

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "http://localhost:5173",
        credentials: true
    })
);

//routes
app.use("/api/v1/employee", employeeRoutes);

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running at ${PORT}`);
    });
}

module.exports = app;