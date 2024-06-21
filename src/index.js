
require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const mongoData = process.env.DATABASE_URL; 
mongoose.connect(mongoData);
const cors = require('cors')
const database = mongoose.connection;
const routes = require('./routes/videoRoutes.js');
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./swagger");
// const multer = require('multer')
const bodyParser = require("body-parser");


const app = express();


database.on('error', (error) => {
    console.log(error);
})

database.once('connected', () => {
    console.log('Database Connected');
})

// Increase the request payload size limit to a larger value (e.g., 50MB)
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cors())
app.options('*', cors())

app.use(express.json());

app.use(
    '/api/v1', routes);

//  Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));

app.listen(3000, () => {
    console.log(`Server started at ${3000}`)
})
