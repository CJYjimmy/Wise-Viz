const main = require('./main');
const postInfo = require('./postInfo');
const profilePicture =  require('./profilePicture');
let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
let cloudinary = require("cloudinary");
const PORT = 3000;

const path = require("path");
const multer = require("multer");

var nodemailer = require('nodemailer');
const creds = require('./emailInfo');

var transport = {
  host: 'smtp.qq.com',
  auth: {
    user: creds.USER,
    pass: creds.PASS
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
    cloud_name: "cjyjimmy520",
    api_key: "327192484168919",
    api_secret: "jc2NclfLIwPzlAZiHEGYIzicFk0"
});

let pool = new pg.Pool({
    user: '',
    database: 'wise-vizDB',
    password: '11221',
    host: '127.0.0.1',
    port: 5432,
    max: 20
});

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("access-control-allow-methods", "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS")
  next();
});

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

// app.post('/api/picture-info/update',(request, response) => profilePicture.updatePicture(request, response, cloudinary));

app.post('/send', (request, response, next) => {
  var email = request.body.email;
  var content = request.body.message;

  var mail = {
    from: creds.USER,
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
    cloudinary.v2.uploader.upload(file,
        {
            public_id: publicID,
            folder: "/profile_picture/" + publicID,
            transformation: [{"width": 360, "height": 360, "crop": "fit"}]
        },
        function(error, result) {console.log(result, error); });
    response.send({one:file});
});

app.listen(3000);