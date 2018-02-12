'use strict';


const express = require('express')
const bodyParser = requrie('body-parser')
const cors = require('cors');
const app  = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('port',7595)



app.listen(app.get('port'),()=>{
})