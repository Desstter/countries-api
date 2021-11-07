const { response } = require('express');
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors')

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001

app.use(express.urlencoded({extended: true})); // New
app.use(express.json()); // New 

const db = mysql.createConnection({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'countrydb',
});

app.get('/', (req, res) => {
    db.connect((err =>  {
        if(err){
            throw err
        }
        console.log('Connected');
    }));
    res.send('I LOVE MY JOB');

});

app.post('/add', (req, res ) =>{
    const name = req.body.name
    const country =req.body.country;

    db.query('INSERT INTO clients_registered (name, country) VALUES (?,?)', [name, country],
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send('Values Inserted')
        }
    })
})

app.listen(port, () => {
    console.log(`Running Server on port ${port}`);
});

