'use strict';
require('dotenv').config();

const schema = require('./src/schema');
const GPS = require('gps');

var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const express = require('express');
const app = express();
const fs = require('fs');

//app.use(express.static('front'));


mongoose.connect('mongodb://'+process.env.DB_HOST+':'+process.env.DB_PORT+'/test').then(() => {
    console.log('Connected successfully.');

    app.listen(process.env.APP_PORT);
}, err => {
    console.log('Connection to db failed: ' + err);
});

app.get('/', (req, res) => {
    schema.Data.find().then(data => {
        console.log(`Got ${data.length} data`);
        res.sendFile(__dirname + '/front/index.html' );
    });
});


app.get('/add', (req, res) => {
    res.sendFile( __dirname + '/front/add.html');
});

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.post('/submit-form', (req, res) => {
    console.log('/submit-form');
    var temp = JSON.stringify(req.body);

    var gps = new GPS;

    gps.on('data', function(data) {
        console.log(data);
        console.log(gps.state);
    });

    /*schema.Data.create({
        category: temp.cato,
        title: temp.title,
        details: temp.des,
        coordinates: {
            lat: Number,
            lng: Number
        },
        image: temp.file
    }).then(post => {
        res.send("Created! id: "+ post.id);
    });*/
    res.send("/submit-form");
});