const express = require('express'); 
const mysql = require('mysql');
const cors = require('cors')
const body_parser = require('body-parser');

var db= mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "zsebet"
});

try {
    db.connect();
    console.log("Connected to database successfully");
} catch (error) {
    console.log(error);
    console.log("Could not connect database!");
}

const app = express(); 
app.use(express.json());
app.use(cors());

app.post('/signin', (req, res) => {

    const nickname = req.body.nickname
    const password = req.body.password
    const name = req.body.name
    const surname = req.body.surname
    const email = req.body.email
    const otp = Math.floor(Math.random() * 100000) + 90000

    db.query("INSERT INTO zsebet_users VALUES (NULL, ?,?,?,?,?, 0,?)", 
    [nickname, password, name, surname, email, otp],
    (err, result) => {
        console.log(err);
    });
});

const port = 3001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})