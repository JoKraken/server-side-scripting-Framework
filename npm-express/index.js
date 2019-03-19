const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World!');
    console.log("id: "+req.ip+", myParam: "+req.query.myParam);
});

app.get('/path1/:param1', (req, res) => {
    res.send('Hello World!2');
    console.log("id: "+req.ip+", :param1: "+req.params.param1);
});

app.get(['/path2', '/path3'], (req, res) => {
    res.sendStatus(200);
    console.log ("id: "+req.ip);
});

//Postman Post: http://localhost:3000/upload
app.post('/upload', (req, res, next) => {
    //do upload
    next();
});

app.use('/upload', (req, res, next) => {
    //do small
    next();
});

app.use('/upload', (req, res) => {
    //do big
    res.send('something');
});

app.listen(3000);