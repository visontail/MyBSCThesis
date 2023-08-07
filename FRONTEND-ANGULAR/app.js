import express from 'express';
import cors from 'cors';

import { getMesStat, getPosition, getStation,getStations } from './database.js'

const app = express()

app.use(cors({
    origin: 'http://localhost:4200'
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

// get .....
app.get("/mestat/:id", async (req, res) => {
    const id = req.params.id
    const station = await getMesStat(id)
    res.send(station)
})

app.use((res, err, req, next) => {
    console.log(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})

app.get('/', (res, req) => {
    res.status(200).json({title: 'Hello World'});
})