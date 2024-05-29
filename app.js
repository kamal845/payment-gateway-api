require("dotenv").config();
const path = require('path');
const app = require('express')();
var http = require('http').Server(app);
const paymentRoute = require('./routes/paymentRoute');
app.use('/',paymentRoute);

http.listen(8000, function(){
    console.log('Server is running');
});