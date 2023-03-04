require("dotenv").config();
var express     = require('express');
var middleware  = require('./middleware/headerValidator');
var cors = require('cors');
app = express();
var bodyParser = require("body-parser");

var user	= require('./modules/user/route');
var product	= require('./modules/product/route');
const con = require("./config/database");

app.use(cors({ origin: "*"}));
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.text({limit: '50mb', extended: true}));
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: '50mb' ,  extended: true}));

app.use(middleware.validateHeaderToken);
app.use('/api/user/',user);
app.use('/api/product/',product);

// connection
try {
	server = app.listen(process.env.PORT);
	console.log("Connected to practical test On PORT : "+process.env.PORT);
} catch (err) {
	console.log("Failed to connect");
}
