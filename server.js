const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password', // add your own password here
    database: 'departments_db'
  },
  console.log(`Connected to the departments_db database.`)
);

app.get('/api/department', (req, res) => {
    console.info(`${req.method} request received to /api/department`);
    db.query(`SELECT * FROM department;`, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send("database error");
        } else {
            console.log("Department retrieved!!");
            res.json(result);
        }
    });
});

app.post('/api/add-department', (req, res) => {
    console.info(`${req.method} request received to /api/add-department`);
    let department_name = req.body.department_name;
    console.log(req.body.department_name);
    db.query(`INSERT INTO department (department_name) VALUES ("${department_name}");`, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send("database error");
        } else {
            console.log(result);
            res.send("Department added!");
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});