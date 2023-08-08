import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

// Collection of connections (= pool) for Database
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()    //promise() => this will allow to use the promise api version, asnyc not callbacks

// [rows] => stores the first part (Child) of the result in an array called rows

// Get ALL Stations Informations
export async function getStations() {
    const [rows] = await pool.query("SELECT * FROM Stations")
    return rows
}

// Get Stations Informations
export async function getPosition() {
    const [stationPos] = await pool.query("SELECT StationID, posLatitude, posLongitude FROM Stations")
    return stationPos
}

// get StationName using id for map tag text
export async function getStation(id) {
    const [rows] = await pool.query(`
    SELECT StationName
    FROM Stations
    WHERE StationID = ?
    `, [id])
    // not using ${id} -> to avoid injection attacks, this will run the query and pass in the untrusted id as a second parameter
    return rows[0]
}

// get 
export async function getMesStat(id) {
    const [rows] = await pool.query(`
    SELECT StationID, startTime, endTime, Direction, CyclistTraff, PedestrianTraff, OtherTraff
    FROM Measurements
    WHERE StationID = ?
    `, [id])
    // not using ${id} -> to avoid injection attacks, this will run the query and pass in the untrusted id as a second parameter
    return rows
}

// get 
export async function demoQuery() {
    const [rows] = await pool.query(
    `SELECT *
    FROM Measurements
    ORDER BY timestamp DESC
    LIMIT 5;
    `)
    // not using ${id} -> to avoid injection attacks, this will run the query and pass in the untrusted id as a second parameter
    return rows
}

