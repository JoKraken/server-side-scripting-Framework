const schema = require('../models/data');
const sharp = require('sharp');

exports.getAllData = () => {
    return schema.Data.find().then(data => {
        return data;
    });
};

exports.deletDataAll = (id) => {
    return schema.Data.remove({delete: false}, function (err) {
        console.log("all deleted");
        return 200;
    });
};

exports.deletDataById = (id) => {
    return schema.Data.findByIdAndRemove(id, function (err) {
        return 200;
    });
};

exports.createData = (req, res) =>  {
    return schema.Data.create({
        category: req.body.cato,
        title: req.body.title,
        details: req.body.des,
        coordinates: {
            lat: 0,
            lng: 0
        },
        image: (req.file == undefined) ? "" : req.file.filename
    }).then(post => {
        //console.log(post);

        if(req.file != undefined) {
            return sharp(req.file.path).resize(320,240).toFile("front/uploads/medium/"+req.file.filename).then(
                (err, info) =>{
                    //console.log(err);
                    return "/front/index.html";
                }
            );
        }else{
            return "/front/index.html";
        }
    });

};

exports.editData = (req, res) =>  {
    var temp = req.body;

    let data = {
        category: temp.cato,
        title: temp.title,
        details: temp.des,
    };

    if(req.file != undefined) data.image= req.file.filename;

    return schema.Data.update({
            _id: req.params.id
        }, data
    ).then(post => {
        console.log(post);
        if(req.file != undefined) {
            sharp(req.file.path).resize(320,240).toFile("front/uploads/medium/"+req.file.filename).then(
                (err, info) =>{
                    //console.log(err);
                    return "/front/index.html";
                }
            );
        }else{
            return "/front/index.html";
        }
    });
};