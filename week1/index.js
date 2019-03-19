'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const express = require('express');
const app = express();

app.use(express.static('front'));

const catSchema = new Schema({
    name:  String,
    age: Number,
    gender:   {
        type: String,
        enum : ['female','male'],
        default: 'female'
        },
    colour: String,
    weight: Number
});

const Cat = mongoose.model('Cat', catSchema);

mongoose.connect('mongodb://localhost:27017/test').then(() => {
    console.log('Connected successfully.');

    app.listen(3000);
}, err => {
    console.log('Connection to db failed: ' + err);
});

app.get('/', (req, res) => {
    Cat.create({
        name:  "citty",
        age: 4,
        gender:   "femal",
        colour: "black",
        weight: 22
    }).then(post => {
        console.log(post.id);
        res.send("Created! id: "+ post.id);
    });
});

app.get('/all', (req, res) => {
    Cat.find().then(cats => {
        console.log(`Got ${cats.length} cats`);
        res.send(cats);
    });
});

//get mal cats over 10kg & older than 10
app.get('/cats', (req, res) => {
    Cat.find().then(cats => {
        console.log(`Got ${cats.length} cats`);
        res.send(cats);
    });
});

//create cats
app.post('/create', (req, res) => {
    console.log('post create');
});
//create cats
app.get('/create', (req, res) => {
    console.log('get create' + req.toString());
    res.sendStatus(200);
});