const express = require('express');
const mysql = require('mysql');

// Create DB Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "VeloClass"
});

// Connect
db.connect((err)=> {
    if(err){
        throw err;
    }
    console.log('MySQL Connected...');
});

// Create DB
/* app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
}); */



const app = express();

app.listen('3000', () => {
    console.log('Server started on port 3000');
})


// Select all data
app.get('/getdata', (req,res) => {
    let sql = 'SELECT * FROM Stations';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log((results));
        res.send('All data fetched...')
    })
})

// Select a data
app.get('/getdata/:id', (req,res) => {
    let sql = `SELECT * FROM Stations WHERE Station_ID = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log((result));
        res.send('Data fetched...')
    })
})



