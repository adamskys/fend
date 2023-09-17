// Setup empty JS object to act as endpoint for all routes

// Require Express to run server and routes
const express = require("express");
const port = 3000;
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded());
app.use(express.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

let projectData = [];

// Setup Server
app.get("/", (req, res) => {
  res.send(projectData);
  console.log(projectData);
});

const addWeatherEntry = (req, res) => {
  console.log(req.body);
  newEntry = {
    temp: req.body.temp,
    feelings: req.body.feelings,
    date: req.body.date,
  };

  projectData.push(newEntry);
  res.send(projectData);
  console.log(projectData);
};
app.post("/", addWeatherEntry);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
