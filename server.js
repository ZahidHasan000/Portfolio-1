const mongoose = require('mongoose');
const dotenv = require('dotenv');

const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");

const userRouter = require("./routes/userRoutes")

dotenv.config({ path: './config/config.env' });
const server = http.createServer(app);

app.use(cors());
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: true, limit: "500mb" }));
app.use(cookieParser());

app.use("/api/v1", userRouter);

const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('Unhandled Rejection!  Shutting down');

  server.close(() => {
    process.exit(1);
  });
})