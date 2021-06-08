const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser')
const cors = require('cors');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'argonautesDB'
});

app.use(cors());
app.use(express.json()); 
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    const sqlInsert = `insert into argos (argo_name, argo_gender) values ('Hera', 'female');`
    db.query(sqlInsert, (error, result) => {
       res.send('hello paco') 
    })    
})

app.get('/api/get',(req, res) => {
    const sqlSelect = `SELECT * FROM argos;`
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    });
})

app.post('/api/insert', (req, res) => {
    const argoName = req.body.argoName;
    const argoGender = req.body.argoGender;

    const sqlInsert = `INSERT INTO argos (argo_name, argo_gender) VALUES (?,?);`
    db.query(sqlInsert, [argoName, argoGender], (err, result) => {
        console.log(result)
   });
});

app.listen(3005, () => {
    console.log('running on server 3005')
});