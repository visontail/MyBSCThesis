import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from "body-parser";

//  import sql query funtions
import {
  getMarkerData,
  getMeasurementsTable,
  getStats,
  getStationsTable,
  getSumStations,
  getTodaySum,
  getYearSum,
  postChangedStation,
} from "./database.js";

// import token verification function
import { verifyToken } from "./verify.js";

dotenv.config({ path: '../../.env' });

//  using express.js framework
const app = express();

const port = process.env.API_PORT;

// CORS - for vue.js project
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(bodyParser.json());

// ---- STATION DATA ----
// GET 'Stations' DB table content
app.get("/stations", async (req, res) => {
  const stations = await getStationsTable();
  res.send(stations);
});
// GET stations' data - used in google.maps.marker
app.get("/pos", async (req, res) => {
  const data = await getMarkerData();
  res.send(data);
});
// GET all station number - used in menubar
app.get("/sum", async (req, res) => {
  const sum = await getSumStations();
  res.send(sum);
});
// POST chanhged station data - used in admin page
app.post("/station", verifyToken, async (req, res) => {
  try {
    const id = req.body.id
    const name = req.body.name
    const lat = req.body.lat
    const lng = req.body.lng
    const vis = req.body.vis
    const changes = await postChangedStation(name, lat, lng, vis, id)
    res.status(200).send(changes)
  }catch{
    console.error("An error occurred:", error);
    res.status(401).send("An error occurred while processing the request");
  }
})

// ---- MEASUREMENT DATA ----
// GET 'Measurements' DB table content
app.get("/measurements", async (req, res) => {
  const measurements = await getMeasurementsTable();
  res.send(measurements);
});
// GET measurement data from provided station
app.get("/stats/:id", async (req, res) => {
  const id = req.params.id;
  const measurementdata = await getStats(id);
  res.send(measurementdata);
});
// GET today's total traffic in given station
app.get("/today/:id", async (req, res) => {
  const id = req.params.id;
  const measurementdata = await getTodaySum(id);
  res.send(measurementdata);
});
// GET this year's total traffic in given station
app.get("/this-year/:id", async (req, res) => {
  const id = req.params.id;
  const measurementdata = await getYearSum(id);
  res.send(measurementdata);
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
