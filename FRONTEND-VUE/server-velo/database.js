import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config({ path: '../../.env' });

// Collection of connections (= pool) for Database
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()    // allow to handle asynchronous operations

// ---- STATIONS TABLE ----
// SELECT 'Stations' DB table content
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
// SELECT Stations' data without uid
export async function getMarkerData() {
    try{
        const [rows] = await pool.query("SELECT StationID, StationName, StationImg, posLatitude, posLongitude, isVisible FROM Stations")
        return rows 
    }
    catch(error) {
        console.error("Error fetching Stations' data:", error);
        throw error;
    }
}
// SELECT Stations' data without uid, img
export async function getStations() {
    try{
        const [stationPos] = await pool.query("SELECT StationID, StationName, posLatitude, posLongitude, isVisible FROM Stations")
    return stationPos
    }
    catch(error) {
        console.error("Error fetching data for Markers:", error);
        throw error;
    }
}
// COUNT Stations
export async function getSumStations() {
    try{
        const [sumStation] = await pool.query(`
            SELECT COUNT(*) AS row_count
            FROM Stations
            WHERE isVisible = 1`)
        return sumStation
    }
    catch(error) {
        console.error("Error fetching number of station:", error);
        throw error;
    } 
}
// UPDATE Station's data
export async function postChangedStation(name, lat, lng, vis, id) {
    try{
        const [rows] = await pool.query(`
            UPDATE Stations
            SET StationName = ?, posLatitude = ?, posLongitude = ?, isVisible = ?
            WHERE StationID = ?`,
            [name, lat, lng, vis, id]
        )
        return rows
    }
    catch(error) {
        console.error("Error fetching statistics:", error);
        throw error;
    }
}


// ---- MEASUREMENTS TABLE ----
// SELECT 'Measurements' DB table content
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
// SELECT measurement data from provided station
export async function getStats(id) {
    try{
        const [rows] = await pool.query(`
            SELECT Date, startTime, endTime, weekNumber, CycTraff1, PedTraff1, OtherTraff1, CycTraff2, PedTraff2, OtherTraff2
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
// SUM DAILY Bicycle Traffic in a given STATION
export async function getTodaySum(id) {
    try{
        const [rows] = await pool.query(`
        SELECT SUM(CycTraff1) AS TotalTraffic
        FROM Measurements
        WHERE DATE(startTime) = CURDATE() AND StationID = ?`,
        [id]
        )
        return rows
    }
    catch(error) {
        console.error("Error fetching statistics:", error);
        throw error;
    }
}
// SUM YEARLY Bicycle Traffic in a given STATION
export async function getYearSum(id) {
    try{
        const [rows] = await pool.query(`
        SELECT SUM(CycTraff1) AS TotalTraffic
        FROM Measurements
        WHERE YEAR(startTime) = YEAR(CURDATE()) AND StationID = ?`,
        [id]
        )
        return rows
    }
    catch(error) {
        console.error("Error fetching statistics:", error);
        throw error;
    }
}
// SUM YEARLY Bicycle Traffic in all STATIONS
// CODE GOES HERE

// ---- LOGIN TABLE ----
// SELECT ALL USERS
export async function getUsers() {
    try{
        const [rows] = await pool.query(`
        SELECT *
        FROM Login`
        )
        return rows
    }
    catch(error) {
        console.error("Error fetching statistics:", error);
        throw error;
    }
}
// INSERT NEW USER
export async function postUsers(user, pass) {
    try{
        const [rows] = await pool.query(`
        INSERT INTO Login (UserName, Password)
        VALUES (?,?)
        `, [user, pass]
        )
        return rows
    }
    catch(error) {
        console.error("Error fetching statistics:", error);
        throw error;
    }
}

