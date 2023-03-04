var express = require('express');
var con = require('../../config/database');
var middleware = require('../../middleware/headerValidator');
var user_model = require('./user_model');
var asyncLoop = require('node-async-loop');
var lang = require('../../languages/en.json');
var router = express.Router();
 
//This API use of register a user
router.post("/register", function (req, res) { 
    var rules = {
        name: "required",
        mobile: "required",
        email: "required|email",
        password: "required",
    }
    const messages = {
        'required': lang['required'],
    }
    if (middleware.checkValidationRules(req.body, res, rules, messages)) {
        user_model.register(req.body, function (response,msg,code) {  
            middleware.sendresponse(res,code,msg,response);
        });
    }
})

//This API use of login for both user and admin
router.post("/login", function (req, res) {
    var rules = {
        mobile: "required",
        password: "required",
    }
    const messages = {
        'required': lang['required'],
    }
    if (middleware.checkValidationRules(req.body, res, rules, messages)) {
        user_model.login(req.body, function (response,msg,code) {  
            middleware.sendresponse(res,code,msg,response);
        });
    }
});

//This API use of get list of users
router.post("/user_list", function (req, res) {
    var rules = {
        page: "required"
    }
    const messages = {
        'required': lang['required'],
    }
    if (middleware.checkValidationRules(req.body, res, rules, messages)) {
        user_model.user_list(req.body, function (response,msg,code) {  
            middleware.sendresponse(res,code,msg,response);
        });
    }
});

module.exports = router;
