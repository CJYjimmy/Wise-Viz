let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
const PORT = 3000;

let pool = new pg.Pool({
    user: '',
    database: 'wise-vizDB',
    password: '11221',
    host: '127.0.0.1',
    port: 5432,
    max: 10
});

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/api/new-user', function(request, response) {
    let userName = request.body.userName;
    let password = request.body.password;
    let values = [userName, password];
    pool.connect((err, db, done) => {
        if (err) {
            return console.log(err);
        } else {
            db.query('INSERT INTO "userInfo" ("userName", "password") VALUES ($1, $2)', values, (err, table) => {
                done();
                if (err) {
                    return console.log(err);
                } else {
                    console.log('INSERT SUCCEFUL');
                }
            })
        }
    })
});


app.listen(3000);