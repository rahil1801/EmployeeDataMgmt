const express = require('express');
const cors = require('cors');
const connectDb = require('./config/database');
const employeeRoutes = require('./routes/Employee');
require("dotenv").config();

const app = express();
connectDb();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(
    cors({
        origin:"http://localhost:5173",
        credentials:true
    })
);

//routes
app.use("/api/v1/employee", employeeRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})