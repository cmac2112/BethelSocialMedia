//require('dotenv').config()
//const mysql = require('mysql');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json())

// will need some sort of middleware to handle files in POST requests
// multer is the middleware, storing files is another issue



//we will need GET and POST for comments -- angel
//we will need GET, PUT, and POST for profile bios




app.get('/api/test', (req, res)=>{
    console.log(req.method + ' request for ' + req.url);
        res.send({message: 'test api'})
    })

//get request for posts would look something like
/*app.get('/whatever/:poster, (req, res) =>{
    const sql = SELECT * FROM posts WHERE poster = ?
    const values = whatever value is passed into the url /:poster
    con.query(sql, values)...
    res.send(rows)
    ...
    })
*/
const port = process.env.SERVER_PORT || 3000;
    app.listen(port, () =>{
        console.log('Server started on port ' + port);
    })
