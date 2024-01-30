const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var http = require("http");

require("./models");
require("dotenv").config();
const shortid = require("shortid");

app.use(cors({ origin: true, credentials: true }));

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://verifyid-backend.onrender.com"],
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", routes);

// port initializing
const port = 5000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

//static image folder
app.use("/images", express.static("images"));

// main route
app.get("/", (req, res) => {
  res.send("Server is running");
});

//catch-all middleware for "not found" routes
app.use((req, res) => {
  res.status(404).send("Route not found");
});

app.listen(port, () =>
  console.log(`Server is listening at http://localhost:${port}`)
);
