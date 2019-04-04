const schema = require('../models/user');

exports.checkUser = (body) => {
    console.log(body);
    return schema.User.find({username: body.name}).then(data => {
        console.log(data);
        if(data.length==1) {
            if(data[0].password == body.pwd){
                return 200;
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