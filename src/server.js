const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const userRoutes = require('../src/Routes/userRoutes.js');
const swaggerUi = require('swagger-ui-express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const configuration = require('../src/config/index.js');
const swagger = require('../src/docs/swagger.json');
const employeeroute = require('./Routes/employeeRoute.js');
const jobRoutes = require('../src/Routes/jobRoutes.js');
const bookingRoutes = require('../src/Routes/bookingRoutes.js');



const corsOptions = {
    origin: [
      "https://quickhelp-d3dy.onrender.com/",
      "http://localhost:5173/ Locally",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  };

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use('/api/v1/employee', employeeroute);
app.use('/QuickHelp', swaggerUi.serve, swaggerUi.setup(swagger));
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/Jobs', jobRoutes);
app.use('/api/v1/Booking', bookingRoutes);
app.use('/upload', express.static(path.join(__dirname, 'upload')));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("listening on port " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
