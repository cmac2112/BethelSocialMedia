//require('dotenv').config()
//const mysql = require('mysql');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json())

// will need some sort of middleware to handle files in POST requests

app.get('/api/test', (req, res)=>{
    console.log(req.method + ' request for ' + req.url);
        res.send({message: 'test api'})
    })

const port = process.env.SERVER_PORT || 3000;
    app.listen(port, () =>{
        console.log('Server started on port ' + port);
    })
