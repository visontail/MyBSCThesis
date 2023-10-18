import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

//  import queries
import {
  getMarkerData,
  getMeasurementsTable,
  getStats,
  getStationsTable,
  getSumStations,
  getTodaySum,
  getYearSum,
  getUsers,
  postUsers,
} from "./database.js";

dotenv.config({ path: '../../.env' });

//  using express.js framework
const app = express();
const port = process.env.PORT;

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(bodyParser.json());


app.get('/users', async (req, res) => {
  const users = await getUsers();
  res.json(users)
});

app.post('/users', async (req,res) => {
  try {
    const hasedPass = await bcrypt.hash(req.body.password, 10)
    const user = { name: req.body.name, password: hasedPass}
    await postUsers(user.name, user.password)
    res.status(201).send("User created!")
  }
  catch{
    res.status(500).send()
  }
})

app.post('/login', async (req,res) => {
  const users = await getUsers();
  const user = users.find(user => user.UserName == req.body.name)
  if (!user) {
    return res.status(400).send("Invaild username")
  }
  try{
    if (await bcrypt.compare(req.body.password, user.Password)){
      res.send("Success")
    } else {
      res.send("Not allowed!")
    }
  }
  catch{
    res.status(500).send()
  }
})

// Database Middleware
// GET 'Stations' DB table content
app.get("/stations", async (req, res) => {
  const stations = await getStationsTable();
  res.send(stations);
});

// GET 'Measurements' DB table content
app.get("/measurements", async (req, res) => {
  const measurements = await getMeasurementsTable();
  res.send(measurements);
});

// GET stations' data - used in google.maps.marker
app.get("/pos", async (req, res) => {
  const data = await getMarkerData();
  res.send(data);
});

// GET measurement data from provided station - used in content window
app.get("/stats/:id", async (req, res) => {
  const id = req.params.id;
  const measurementdata = await getStats(id);
  res.send(measurementdata);
});

// GET
app.get("/today/:id", async (req, res) => {
  const id = req.params.id;
  const measurementdata = await getTodaySum(id);
  res.send(measurementdata);
});

app.get("/this-year/:id", async (req, res) => {
  const id = req.params.id;
  const measurementdata = await getYearSum(id);
  res.send(measurementdata);
});

// GET all station number - used in menubar
app.get("/sum", async (req, res) => {
  const sum = await getSumStations();
  res.send(sum);
});


//  Listening Port
app.listen(port, () => {
  console.log(`Server is running.`);
});
//  Welcome Page
app.get("/", (req, res) => {
  res.status(200).json({
    title: "Welcome to WebVelo's API",
    port: `Server is running on port: ${port}`,
    content: "Description of the API goes here"
  });
});
//  Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
