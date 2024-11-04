//require('dotenv').config()
//const mysql = require('mysql');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json())
const path = require('path');

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

// Serve static files from the React app, this allows us to not have 3 containers running and makes it easier to host
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
const port = process.env.SERVER_PORT || 3000;
    app.listen(port, () =>{
        console.log('Server started on port ' + port);
    })
