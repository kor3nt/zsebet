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

app.post('/signup', (req, res) => {

    
    const nickname = req.body.nickname
    const password = req.body.password
    const name1 = req.body.name1
    const surname = req.body.surname
    const email = req.body.email
    const otp = Math.floor(Math.random() * 100000) + 90000

    db.query("SELECT * FROM zsebet_users WHERE nick=? OR email=?", 
    [nickname, email],
    (err, result) => {
        if (err) console.log(err);
        
        if(result.length > 0){
            res.send("Istnieje już taki użytkownik!")
        }
        else{
            db.query("INSERT INTO zsebet_users VALUES (NULL, ?,?,?,?,?, 0,?)", 
            [nickname, password, name1, surname, email, otp],
            (err, result) => {
               if (err) console.log(err);
            });
        }
    });
   

    

    
});

const port = 3001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})