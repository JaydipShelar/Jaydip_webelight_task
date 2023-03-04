var con = require('../../config/database');
var lang = require('../../languages/en.json');
const multer = require('multer');
const path = require('path');
var middleware = require('../../middleware/headerValidator');
var asyncLoop = require('node-async-loop');
var moment = require('moment');

var Product={

    add_product : (req,callback)=>{
        let product_data= {
            product_name : req.product_name,
            price : req.price,
            color : req.color,
            size : req.size,
            quantity : req.quantity,
        };
        con.query("INSERT INTO products SET ? ",product_data,(err,result)=>{ console.log(err);
            if(!err){ 
                con.query("SELECT id,product_name,color,price,size,quantity FROM products WHERE id='"+result.insertId+"';", function (errProduct , resultProduct){
                    if(!errProduct && resultProduct[0] != undefined){
                        callback(resultProduct[0], lang['text_product_added_success'], 1);
                    }else{
                        callback(null, lang['text_product_add_fail'], 0);
                    }
                })
            }else{
                callback(null, lang['something_went_wrong'], 0);
            }
        });
    },

    product_list : (req,callback) => {
        let where = "";   
        if(req.product_name != undefined && req.product_name != ''){
            let search = req.search_key;
            where += ` AND product_name = '${req.product_name}' `;
        }     
        if(req.search_key != undefined && req.search_key != ''){
            let search = req.search_key;
            where += ` AND (product_name LIKE '%${search}%' OR color LIKE '%${search}%' OR quantity LIKE '%${search}%' OR price LIKE '%${search}%')`;
        }
        if(req.order_by != undefined){
            let order = req.order_by;
            where += `ORDER BY id ${order} `;
        }
        if(req.page != undefined)
        {
            if(req.page > 1){
                let skip = (req.page * 10);
                where += `LIMIT 10 , ${skip}`;
            }else{
                where += `LIMIT 10`;
            }
        }
        con.query("SELECT * FROM products WHERE is_active='1' "+where+";",function (err,result){ console.log(err);
            if(!err && result[0] != undefined){
                callback(result, lang['product_list_success'], 1);
            }else{
                callback(null, lang['product_list_failure'], 0);
            }
        })
    },

    product_details : (req,callback)=>{
        con.query("SELECT * FROM products WHERE is_active='1' AND id="+req.product_id+";",function (err,result){ console.log(err);
            if(!err && result[0] != undefined){
                callback(result[0], lang['product_detail_success'], 1);
            }else{
                callback(null, lang['something_went_wrong'], 0);
            }
        })
    },

    edit_product: function (request, callback) { 
        var updparams = {
            product_name: request.product_name,
            price: request.price,
            color: request.color,
            size: request.size,
            quantity: request.quantity,
            updated_at:moment().format("YYYY-MM-DD HH:mm:ss")
        }
        con.query("UPDATE products SET ? WHERE id = ? ", [updparams, request.product_id], function (err, result, fields) {  
            if (!err) {
                con.query("SELECT * FROM products WHERE is_active='1' AND id='"+request.product_id+"';",function (err,product_data){ 
                    callback(product_data[0], lang['rest_keywords_success'], 1);
                }); 
            } else {
                callback(null, lang['something_went_wrong'], 0);
            }
        });
    },

    delete_product: function (request, callback) {
        var updparams = {
            is_active : 0,
            deleted_at:moment().format("YYYY-MM-DD HH:mm:ss")
        }
        con.query("UPDATE products SET ? WHERE id = ? ", [updparams, request.product_id], function (err, result) { 
            if (!err) {
                callback(null, lang['text_product_delete_successfully'], 1);
            } else {
                callback(null, lang['something_went_wrong'], 0);
            }
        }); 
    },
}

module.exports = Product;
