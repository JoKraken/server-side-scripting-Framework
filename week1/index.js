'use strict';
require('dotenv').config();

const schema = require('./src/schema');
const GPS = require('gps');
var multer = require('multer')
var upload = multer({dest: 'front/uploads/'})

var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const express = require('express');
const app = express();
const fs = require('fs');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static('front'));
//app.use(express.static('uploads'));


mongoose.connect('mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/test').then(() => {
    console.log('Connected successfully.');

    app.listen(process.env.APP_PORT);
}, err => {
    console.log('Connection to db failed: ' + err);
});

//send all the Data back
app.get('/all', (req, res) => {
    schema.Data.find().then(data => {
        //console.log(data);
        res.json(data);
    });
});

app.delete('/delete', function (req, res) {
    schema.Data.remove({"title": ""});

    res.sendStatus(200);
});

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.post('/submit-form', upload.single('image'), (req, res) => {
    console.log(req.file);
    var temp = req.body;

    schema.Data.create({
        category: temp.cato,
        title: temp.title,
        details: temp.des,
        coordinates: {
            lat: 0,
            lng: 0
        },
        image: req.file.filename
    }).then(post => {
        console.log(post);

        

        res.sendFile(__dirname + "/front/index.html");
    });
    //res.sendFile("/submit-form");
});
