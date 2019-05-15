const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const customError = require('../config/custom-error');

// User Schema
const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    password: {
        type: String,
        required: true
    }

});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username : username}
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){

    // Check for same username is already existed
    User.getUserByUsername(newUser.username,(err,user)  => {
        if(err){
            throw err;
        }else{
            if(user){
                // Means user is existed with this username;
                callback(customError('User is already existed with this username! Please try another username'),null);         
            }else{
                // Means username is not matched
                bcrypt.genSalt(10, (err, salt) => {
                    if(err){
                        console.log('Error in gensalt -> ' + err);
                    }else{            
                        bcrypt.hash(newUser.password, salt, (err, hash) =>{
                            if(err){
                                throw err;
                            }else{
                                newUser.password = hash;
                                newUser.save(callback);
                            }            
                        })
                    }        
                })
            }
        }
    });

}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword,hash, (err, isMatch) => {
        if(err) throw  err;
        callback(null, isMatch);
    });
}
