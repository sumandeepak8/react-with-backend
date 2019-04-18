const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
const app = new express();
const PORT = process.env.PORT || 8000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'books'
});

connection.connect(function(error) {
  if (error) {
    console.log('error', error);
  } else {
    console.log('connected');
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());

app.post('/addBook', (req, res) => {
  connection.query(`INSERT INTO books(name) VALUES('${req.body}')`, function(
    err
  ) {
    if (err) throw err;
    connection.query('SELECT * FROM books', function(err, result) {
      if (err) throw err;
      res.send(result);
    });
  });
});

app.use(express.static('build'));
app.listen(PORT, () => console.log('listening on ', PORT));
