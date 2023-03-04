var express = require('express');
var con = require('../../config/database');
var middleware = require('../../middleware/headerValidator');
var product_model = require('./product_model');
var asyncLoop = require('node-async-loop');
var lang = require('../../languages/en.json');
var router = express.Router();
 
//API for add product 
router.post("/add_product",function (req, res) {  
    var rules = {
        product_name: "required",
        price: "required",
        color : "required",
        size: "required",
        quantity : "required"
    }
    const messages = {
        'required': lang['required'],
    }
    if (middleware.checkValidationRules(req.body, res, rules, messages)) {
        product_model.add_product(req.body, function (response,msg,code) {
            middleware.sendresponse(res,code,msg,response);
        });
    }
});

// for product listing
router.post("/product_list",function (req, res) { 
    var rules = {
        page: "required",
    }
    const messages = {
        'required': lang['required'],
    }
    if (middleware.checkValidationRules(req.body, res, rules, messages)) {
        product_model.product_list(req.body,function (response,msg,code) {
            middleware.sendresponse(res,code,msg,response);
        });
    }
});

router.post("/product_details",function (req, res) { 
    var rules = {
        product_id: "required",
    }
    const messages = {
        'required': lang['required'],
    }
    if (middleware.checkValidationRules(req.body, res, rules, messages)) {
        product_model.product_details(req.body,function (response,msg,code) {
            middleware.sendresponse(res,code,msg,response);
        });
    }
});

//for edit product
router.post("/edit_product",function (req, res) { 
    var rules = {
        product_id:"required",
        product_name: "required",
        price: "required",
        color : "required",
        size: "required",
        quantity : "required"
    }
    const messages = {
        'required': lang['required'],
    }
    if (middleware.checkValidationRules(req.body, res, rules, messages)) {
        product_model.edit_product(req.body,function (response,msg,code) {
            middleware.sendresponse(res,code,msg,response);
        }); 
    }
});

//for delete product
router.post("/delete_product",function (req, res) { 
    var rules = {
        product_id:"required",
    }
    const messages = {
        'required': lang['required'],
    }
    product_model.delete_product(req.body,function (response,msg,code) {
        middleware.sendresponse(res,code,msg,response);
    });
});


module.exports = router;
