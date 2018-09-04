
const mongoose = require('mongoose');
const validator = require('validator');
const jwt  = require('jsonwebtoken');
const _ = require('lodash');

// {
//     emial: '472382917@qq.com,
//token:[{
 //   access:''
//}]
// }
//use email validator;

var UserSchema = new mongoose.Schema({
    email: {
        required : true,
        trim: true,
        type: String,
        minlength: 1,
        unique: true,
        validate: {
            // true or false
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email!'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6,

    },
    tokens: [{
        access: {
            type: String,
            require: true,
        },
        token: {
            type: String,
            require: true,
        }


    }],
});

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject,['_id', 'email']);
};
//定义实例化方法
UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access},'abc123');
    user.tokens = user.tokens.concat([{access, token}]);

    return user.save().then(()=>{
        return token;
    })
};




var Users = mongoose.model('User', UserSchema);

module.exports = {Users};