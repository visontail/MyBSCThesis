import express from 'express';
import cors from 'cors';

import { getMesStat, getPosition, getStation,getStations } from './database.js'

const app = express()
const port = 8080

app.use(cors({
    origin: 'http://localhost:5173'
}));

// get all stations info
app.get("/stations", async (req, res) => {
    const stations = await getStations()
    res.send(stations)
})

// get all station's positions
app.get("/pos", async (req, res) => {
    const positions = await getPosition()
    res.send(positions)
})

// get a station info with putting id
app.get("/station/:id", async (req, res) => {
    const id = req.params.id
    const station = await getStation(id)
    res.send(station)
})


app.get("/meas/:id", async (req, res) => {
    const id = req.params.id
    const data = await getMesStat(id)
    res.send(data)
})


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

app.get('/', (req, res) => {
    res.status(200).json({title: "Welcome to WebVelo's API"});
})

app.use((req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Something broke!');
});
