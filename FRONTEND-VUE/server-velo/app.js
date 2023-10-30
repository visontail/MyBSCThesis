import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

//  import queries
import {
  getMarkerData,
  getMeasurementsTable,
  getStats,
  getStationsTable,
  getSumStations,
  getTodaySum,
  getYearSum,
} from "./database.js";

dotenv.config({ path: '../../.env' });

//  using express.js framework
const app = express();
const port = process.env.API_PORT;

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

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
  });
});
//  Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
