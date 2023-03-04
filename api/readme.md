
# Practical

URL : http://localhost:8080/api

Node version : 16.18.0

NPM version : 8.19.2 

API LIST

1.Register :

Purpose - This API used for register new user\
End point : user/register\
Type - POST\
Params - \
Mandatory :  name , mobile , email , password\ 
Note : mobile filed is unique\
Token needed : no\
Access : admin , user

2.Login :

Purpose - This API used for login\
End point : user/login\
Type - POST\
Params - \
Mandatory :  mobile , password\ 
Note : \
Token needed : no\
Access : admin , user

3.User List :

Purpose - This API used for get user list\
End point : user/product_name\
Type - POST\
Params - \
Mandatory :  page\ 
Optional : name, search_key ,order_by\
Note : \
Token needed : yes\
Access : admin

4.Add Product :

Purpose - This API used for add product\
End point : product/add_product\
Type - POST\
Params - \
Mandatory :  product_name , price , color , size , quantity\ 
Note : \
Token needed : yes\
Access : admin

5.Product List :

Purpose - This API used for get listing or product\
End point : product/product_list\
Type - POST\
Params - \
Mandatory :  page\ 
Optional : product_name ,search_key , order_by \ 
Note : \
Token needed : yes\
Access : admin , user

6.Product details :

Purpose - This API used for get details of one product\
End point : product/product_details\
Type - POST\
Params - \
Mandatory :  product_id\ 
Note : \
Token needed : yes\
Access : admin , user

7.Edit Product :

Purpose - This API used for edit product details\
End point : product/edit_product\
Type - POST\
Params - \
Mandatory : product_id , product_name , price , color , size , quantity\
Note : \
Token needed : yes\
Access : admin

8.Delete Product :

Purpose - This API used for delete product\
End point : product/delete_product\
Type - POST\
Params - \
Mandatory : product_id\
Note : \
Token needed : yes\
Access : admin
