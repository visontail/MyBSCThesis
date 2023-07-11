import express from 'express'
import { getStation,getStations } from './database.js'

const app = express()

// get all stations info
app.get("/stations", async (req, res) => {
    const stations = await getStations()
    res.send(stations)
})

// get a station info with putting id
app.get("/station/:id", async (req, res) => {
    const id = req.params.id
    const station = await getStation()
    res.send(station)
})

app.use((err, req, next) => {
    console.log(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})