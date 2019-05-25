const main = require('./main');
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

app.get('/api/user-info/get', (request, response) => main.getTableData(request, response, pool));
app.post('/api/user-info/check-username-unique', (request, response) => main.checkUsernameUnique(request, response, pool));
app.post('/api/user-info/post', (request, response) => main.postTableData(request, response, pool));
app.put('/api/user-info/put', (request, response) => main.putTableData(request, response, pool));
app.delete('/api/user-info/delete', (request, response) => main.deleteTableData(request, response, pool));


app.listen(3000);