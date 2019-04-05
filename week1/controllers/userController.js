const schema = require('../models/user');

exports.checkUser = (body) => {
    return schema.User.find({username: body.name}).then(data => {
        if(data.length==1) {
            if(data[0].password == body.pwd){
                return data[0]._id;
            }else return 404
        } else return 401;
    });
};

exports.createUser = (body) => {
    return schema.User.create({
        username: req.body.name,
        password: req.body.pwd
    }).then(post => {
        return 200;
    })
};