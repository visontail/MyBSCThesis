import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config({ path: '../.env' });

dotenv.config()


// Collection of connections (= pool) for Database
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()    // allow to handle asynchronous operations

//SELECT 'Stations' DB table content
export async function getStationsTable() {
    try{
        const [rows] = await pool.query("SELECT * FROM Stations")
        return rows 
    }
    catch(error) {
        console.error("Error fetching Stations' data:", error);
        throw error;
    }
}

//SELECT 'Measurements' DB table content
export async function getMeasurementsTable() {
    try{
        const [rows] = await pool.query("SELECT * FROM Measurements")
        return rows
    }
    catch(error) {
        console.error("Error fetching Measurements' data:", error);
        throw error;
    }
}

//SELECT stations' data
export async function getMarkerData() {
    try{
        const [stationPos] = await pool.query("SELECT StationID, StationName, posLatitude, posLongitude FROM Stations")
    return stationPos
    }
    catch(error) {
        console.error("Error fetching data for Markers:", error);
        throw error;
    }
}

// SELECT measurement data from provided station
export async function getStats(id) {
    try{
        const [rows] = await pool.query(`
            SELECT startTime, endTime, CycTraff1, PedTraff1, OtherTraff1, CycTraff2, PedTraff2, OtherTraff2
            FROM Measurements
            WHERE StationID = ?`,
            [id]
        )
        return rows
    }
    catch(error) {
        console.error("Error fetching statistics:", error);
        throw error;
    }
}

// COUNT Stations
export async function getSumStations() {
    try{
        const [sumStation] = await pool.query(`
            SELECT COUNT(*) AS row_count
            FROM Stations`)
        return sumStation
    }
    catch(error) {
        console.error("Error fetching number of station:", error);
        throw error;
    }
}

