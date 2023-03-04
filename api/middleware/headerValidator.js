var con = require('../config/database');
var Validator = require('Validator');
var lang = require('../languages/en.json');
const jwt = require('jsonwebtoken');

var headerValidator = {
 
    validateHeaderToken: async function (req, res, callback) {
         
        var path_data = req.path.split("/");
        var method = new Array("login","register"); // this array defined that these routes does not need to pass jwt token
        var restricated_api = new Array("user_list","add_product","edit_product","delete_product");
        // restricated_api : this array defined that user can not access this routes
        try {             
                if (method.includes(path_data[3]) != true) { 
                    if (req.headers['token']) {  
                      const isVerify = await headerValidator.verifyJWT(req.headers['token']);
                        if(isVerify){ // check token is valid or not
                          con.query("SELECT * FROM users where id = '" + isVerify.id + "' ", function (err, result) {
                            if(result[0] != undefined){ // check user exist or not
                              if(isVerify.role == 'user'){
                                if(restricated_api.includes(path_data[3]) != true){
                                  req.user_id = result[0].id;
                                  req.username = result[0].username;
                                  req.role = isVerify.role;
                                  callback();
                                }else{
                                  var response_data = {
                                    code: '-1',
                                    message: lang['text_not_have_access'],
                                  };
                                  res.status(401);
                                  res.json(response_data);
                                }
                              }else{
                                req.user_id = result[0].id;
                                req.username = result[0].username;
                                req.role = isVerify.role;
                                callback();
                              }
                            }else{
                              var response_data = {
                                code: '-1',
                                message: lang['text_user_not_exist'],
                              };
                              res.status(401);
                              res.json(response_data);
                            }
                          });
                        }else{
                            var response_data = {
                              code: '-1',
                              message: lang['text_token_expired'],
                          };
                          res.status(401);
                          res.json(response_data);
                        }
                    }else{  
                        var response_data = {
                            code: '-1',
                            message: lang['text_token_not_passed'],
                        };
                        res.status(401);
                        res.json(response_data);
                    }
                
                }else{
                    callback();
                }
           
        } catch (err) {
            response_data = {
                code: '0',
                message: err,
            };
            res.status(200);
            res.json(response_data);
        }
    },
    //for validation 
    checkValidationRules: function  (request,response,rules,messages) {
 
        var v = Validator.make(request, rules, messages);
        if (v.fails()) {
            var Validator_errors = v.getErrors();
            for (var key in Validator_errors) {
             var   error = Validator_errors[key][0];
                break;
            }
          var  response_data = {
                code: 0,
                message: error
            };
                response.status(200);
                response.json(response_data);
        } else {
            return true;
        }
    },
    // for send response
    sendresponse: function (res, responsecode, responsemessage, responsedata) { 
        if (responsedata != null) {
            var  response_data = {
                  code: parseInt(responsecode),
                  message: responsemessage,
                  data: responsedata
              };
                  res.status(200);
                  res.json(response_data);
          } else {
              var  response_data = {
                  code: parseInt(responsecode),
                  message: responsemessage
              };
                res.status(200);
                res.json(response_data);
          }
    },

    //for create JWT token
    createToken : (user,type,callback) => {
        let payload = {
          id: user.toString(),
          role: type
        };
      
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.EXPIRE_JWT_SECRET,
        });
        callback(token);
      },
      
      //for verify jwt token
      verifyJWT : (token) => { 
        try {
          token = token.trim();
          //console.log(token);
          const userInfo = jwt.verify(token, process.env.JWT_SECRET);
          return userInfo;
        } catch (error) {
          return 0;
        }
      },
      
}
module.exports = headerValidator;