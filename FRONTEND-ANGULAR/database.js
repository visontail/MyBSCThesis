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

// Get Stations Informations
export async function getStations() {
    const [rows] = await pool.query("SELECT * FROM Stations")
    return rows
}

//
export async function getStation(id) {
    const [rows] = await pool.query(`
    SELECT *
    FROM Stations
    WHERE StationID = ?
    `, [id])
    // not using ${id} -> to avoid injection attacks, this will run the query and pass in the untrusted id as a second parameter
    return rows[0]
}
