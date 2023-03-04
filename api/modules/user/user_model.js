var con = require('../../config/database');
var lang = require('../../languages/en.json');
var middleware = require('../../middleware/headerValidator');
var asyncLoop = require('node-async-loop');

var User = {
 
    //common function for get user details
    userdetails: function (user_id, callback) { 
        con.query("SELECT id,name,mobile,email,type from users where id = '" + user_id + "' GROUP BY id", function (err, result, fields) { 
            if (!err && result.length > 0) {               
                callback(result[0]);
            } else {
                callback(null);
            }
        });
    },
 
    //for register user
    register: function (request, callback) { 
        con.query("SELECT * FROM users where mobile = '" + request.mobile + "' ", function (err, result) {
            if (!err && result[0] != undefined) {
                callback(null, lang['mobile_already_exists'], 0);
            }else{
                var user_data = {
                    name: request.name,
                    email: request.email,
                    mobile : request.mobile,
                    password:  request.password,
                    type: 'user',
                }
                con.query('INSERT INTO users SET ?', user_data, function (err, result) {  
                    if (!err) {
                        User.userdetails(result.insertId, function (userprofile, err) {
                            middleware.createToken(result.insertId,userprofile.type, function (token) {
                                userprofile.token = token;
                                callback(userprofile, lang['text_user_signup_success'], 1);
                            });
                        });
                    } else {
                        callback(null, lang['something_went_wrong'], 0);
                    }
                });
            }
        });
    },

    //for login
    login: function (request, callback) {  
        var q = con.query("SELECT * FROM users where mobile = '" + request.mobile + "' ", function (err, result) { 
            if (!err && result[0] != undefined) {
                con.query("SELECT * FROM users where id = '" + result[0].id + "' AND password = '" + request.password + "' ", function (err, checklogin) {
                    if (!err && checklogin[0] != undefined) {
                        User.userdetails(checklogin[0].id, function (userprofile, err) {
                            middleware.createToken(checklogin[0].id,checklogin[0].type, function (token) { //function for generate token
                                userprofile.token = token;
                                callback(userprofile, lang['rest_keywords_user_login_success'], 1);
                            });
                        });
                    }else{
                        callback(null, lang['rest_keywords_invalid_password'], 0);
                    }
                });
            }else{
                callback(null, lang['mobile_not_exists'], 0);
            }
        });
    },
    // user list
    user_list : (req,callback) => {
        let where = "";     
        if(req.name != undefined && req.name != ''){
            let search = req.search_key;
            where += ` AND name = '${req.name}' `;
        }     
        if(req.search_key != undefined && req.search_key != ''){
            let search = req.search_key;
            where += ` AND (name LIKE '%${search}%' OR mobile LIKE '%${search}%' OR email LIKE '%${search}%' OR type LIKE '%${search}%') `;
        }
        if(req.order_by != undefined){
            let order = req.order_by;
            where += `ORDER BY id ${order} `;
        }
        if(req.page != undefined)
        {
            if(req.page > 1){
                let skip = (req.page * 10);
                where += `LIMIT 10 , ${skip} `;
            }else{
                where += `LIMIT 10 `;
            }
        }
        con.query("SELECT id,name,mobile,email,type FROM users WHERE is_active='1' "+where+";",function (err,result){  console.log(this.sql);
            if(!err && result[0] != undefined){
                callback(result, lang['text_user_list_success'], 1);
            }else{
                callback(null, lang['text_user_list_not_found'], 0);
            }
        })
    },

}

module.exports = User;
