const mongoose = require('mongoose');
const config = require('../config/database');
const customError = require('../config/custom-error');

const tokenSchema = mongoose.Schema({
    tokenID: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    isLoggedOut: {
        type: Boolean
    },
    logoutDateTime: {
        type: Date
    }
});

const User_Token = module.exports = mongoose.model('User_Token',tokenSchema);

module.exports.getUserTokenById = function(id, callback){
    User_Token.findById(id,callback);
}

module.exports.getUserTokenByToken = function(jwt,callback){
    const query = {tokenID : jwt};
    User_Token.findOne(query,callback);
}

module.exports.addUserToken = function(userTokenData,callback){   
    userTokenData.save(callback);
}

module.exports.updateUserToken = function(userTokenData,callback){
    User_Token.getUserTokenByToken(userTokenData,(err,data)=>{
        if(err){
            throw err;
        }else{
            if(data){
                //userTokenData.update(callback);
                User_Token.findByIdAndUpdate(data._id,{isLoggedOut: true, logoutDateTime: new Date()}
                    ,{new: true}
                    ,(err,data) =>{
                        if(err){
                            callback(err,null);
                        }else{
                            if(data){
                                callback(null,data);
                            }else{
                                callback(null,null);
                        }
                    }
                });
            }
        }
    })
   
}
