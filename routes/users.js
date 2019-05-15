// Define Dependencies
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const UserToken = require('../models/user_token');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    });

    User.addUser(newUser, (err,user) => {
        if(err){
            res.json({success: false, msg: err.message || 'Failed to register user',data: null});
        } else{
            res.json({success: true, msg: 'User registerd', data: null});
        }
    })
})

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password; 
    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, mdg: "User not found", data: null});
        }
        console.log('user ->',user);
        let userRes = user;
        User.comparePassword(password, user.password, (err,isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800  // 1 Week
                });

                // Now store token in database (User_Token)
                let userToken = new UserToken({
                    tokenID : token,
                    userID : userRes._id,
                    isLoggedOut : false,
                    logoutDateTime : ''
                });

                let userTokenID = '';
                UserToken.addUserToken(userToken,(err,data) => {
                    if(err){
                        userTokenID = '';
                        res.json({
                            success: false,
                            message: 'Somwthing went wrong! Please try again later',
                            data: {}
                        });
                    }else{
                        userTokenID = data._id;
                        // Prepare JSON response
                        res.json({
                            success: true,
                            token: 'JWT '+ token,
                            user: { 
                                id: user._Id,
                                name: user.name,
                                username: user.username,
                                email: user.email,
                                usertokenid: userTokenID
                            }
                        });
                    }                    
                })
            } else{
                return res.json({success: false, msg: 'Wrong password',data: null});
            }
        })


    })
})

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    let authHeader = req.header('Authorization');
    let token = authHeader.split(' ');
    // Check for token in database
    UserToken.getUserTokenByToken(token[1],(err,data) => {
        if(err) throw err;
        if(data){
            if(!data.isLoggedOut){
                next();
            }else{
                res.json({success: false, msg: 'Your session is expired please login again!',data: null});
            }
        }
    })    
},(req,res,next) => {
    res.json({success: true, msg: '',data: req.user});
})

// Logout
router.get('/logout',passport.authenticate('jwt',{session: false}),(req,res,next) => {
    // req.logOut();
    let authHeader = req.header('Authorization');
    let token = authHeader.split(' ');
    // Check for token in database
    UserToken.updateUserToken(token[1],(err,data) => {
        if(err) throw err;
        if(data){
            console.log('data -> ',data);
            if(!data.isLoggedOut){
                res.json({error:false,message: 'User logout successfully!',data:null});    
            }else{
                res.json({error:false,message: 'User logout successfully!',data:null});    
            }
        }
    });    
})

// Export routerd
module.exports = router;