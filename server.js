const main = require('./main');
const postInfo = require('./postInfo');
const commentInfo = require('./commentInfo');
let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
let cloudinary = require("cloudinary");

const rimraf = require('rimraf');
const path = require("path");
const multer = require("multer");

var nodemailer = require('nodemailer');

var transport = {
  host: 'smtp.qq.com',
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

console.log(process.env.API_SECRET);

let pool = new pg.Pool({
    user: process.env.PG_USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PG_PORT,
    max: 30
});

let app = express();
app.set("port", process.env.PORT || 3001);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("access-control-allow-methods", "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS")
  next();
});

app.post('/api/comment-info/get', (request, response) => commentInfo.getTableData(request, response, pool));
app.post('/api/comment-info/post', (request, response) => commentInfo.postTableData(request, response, pool));
app.post('/api/comment-info/create-table', (request, response) => commentInfo.createTable(request, response, pool));
app.delete('/api/comment-info/delete', (request, response) => commentInfo.deleteTableData(request, response, pool));

app.get('/api/user-info/get', (request, response) => main.getTableData(request, response, pool));
app.post('/api/user-info/get-username', (request, response) => main.getUsername(request, response, pool));
app.post('/api/user-info/check-username-email-unique', (request, response) => main.checkUsernameAndEmailUnique(request, response, pool));
app.post('/api/user-info/check-email', (request, response) => main.checkEmail(request, response, pool));
app.post('/api/user-info/post', (request, response) => main.postTableData(request, response, pool));
app.put('/api/user-info/update-user-info', (request, response) => main.putTableData(request, response, pool));
app.delete('/api/user-info/delete', (request, response) => main.deleteTableData(request, response, pool));

app.get('/api/post-info/get', (request, response) => postInfo.getTableData(request, response, pool));
app.post('/api/post-info/get-click-user-post', (request, response) => postInfo.getClickUserPosts(request, response, pool));
app.post('/api/post-info/check-email', (request, response) => postInfo.checkEmail(request, response, pool));
app.post('/api/post-info/post', (request, response) => postInfo.postTableData(request, response, pool));
app.put('/api/post-info/put', (request, response) => postInfo.putTableData(request, response, pool));
app.delete('/api/post-info/delete', (request, response) => postInfo.deleteTableData(request, response, pool));

app.post('/send', (request, response, next) => {
  var email = request.body.email;
  var content = request.body.message;

  var mail = {
    from: process.env.USER,
    to: email,
    subject: 'Get back password',
    text: content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      response.json({
        msg: 'fail'
      })
    } else {
      response.json({
        msg: 'success'
      })
    }
  })
})

const storage = multer.diskStorage({
    destination: "./files",
    filename: function(req, file, cb){
      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage }).single("file");
app.post("/api/picture-info/update", upload, (request, response) => {
    let file = request.file.path;
    let publicID = request.body.pictureID;
    cloudinary.v2.uploader.destroy('"/profile_picture/" + publicID');
    cloudinary.v2.uploader.upload(file,
        {
            public_id: publicID,
            folder: "/profile_picture/" + publicID,
            transformation: [{"width": 360, "height": 360, "crop": "fit"}]
        },
        function(error, result) {
          let email = publicID;
          let url = "v" + result.version;
          pool.connect((err, db, done) => {
            if (err) {
              return console.log(err);
            } else {
              db.query('UPDATE "postInfo" SET "url"=$2 WHERE "userEmail"=$1', [email, url], (err, table) => {
                done();
                if (err) {
                  return console.log(err);
                } else {
                  console.log('PUT SUCCEFUL');
                }
              })
              db.query('UPDATE "userInfo" SET "url"=$2 WHERE "email"=$1', [email, url], (err, table) => {
                done();
                if (err) {
                  return console.log(err);
                } else {
                  console.log('PUT SUCCEFUL');
                }
              })
              response.send({here: 'none'});
            }
          })
        });
    rimraf('./files/*', function () { console.log('done'); });
});


app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});