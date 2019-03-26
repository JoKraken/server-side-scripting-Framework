'use strict';
require('dotenv').config();

const schema = require('./models/data');
const dataCon = require('./controllers/dataController');

var multer = require('multer');
var upload = multer({dest: 'front/uploads/'});
const sharp = require('sharp');

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


mongoose.connect('mongodb://'+ process.env.DB_User +':'+ process.env.DB_PWD + '@'+ process.env.DB_HOST + ':' + process.env.DB_PORT + '/test').then(() => {
    console.log('Connected successfully.');
    app.listen(process.env.APP_PORT);
}, err => {
    console.log('Connection to db failed: ' + err);
});

//send all the Data back
app.get('/all', (req, res) => {
    dataCon.getAllData().then((result) => {
        res.send(result);
    });
});

app.delete('/delete/:id', function (req, res) {
    let id = req.params.id;
    console.log("id: "+id);
    if(id == undefined){
        dataCon.deletDataAll().then((result) => {
            res.sendStatus(200);
        });
    }else{
        dataCon.deletDataById(id).then((result) => {
            res.sendStatus(200);
        });
    }
});

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.post('/submit-form', upload.single('image'), (req, res) => {
    console.log("/submit-form");
    dataCon.createData(req, res).then((result) => {
        console.log(result);
        res.sendFile(__dirname + result);
    });
});

app.post('/editArticle/', upload.single('image'), (req, res) => {
    console.log(req.query.id);
    dataCon.editData(req, res).then((result) => {
        console.log(__dirname);
        res.sendFile(__dirname + result);
    });
});

