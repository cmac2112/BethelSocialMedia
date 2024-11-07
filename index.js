require("dotenv").config();
const mysql = require("mysql");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const GOOGLE_USERINFO_API = 'https://www.googleapis.com/oauth2/v3/userinfo';
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  process.env.CLIENT_ID
);

// will need some sort of middleware to handle files in POST requests
// multer is the middleware, storing files is another issue

//we will need GET and POST for comments -- angel
//we will need GET, PUT, and POST for profile bios

app.get("/api/test", (req, res) => {
  console.log(req.method + " request for " + req.url);
  res.send({ message: "test api" });
});

//get request for posts would look something like
/*app.get('/whatever/:poster, (req, res) =>{
    const sql = SELECT * FROM posts WHERE poster = ?
    const values = whatever value is passed into the url /:poster
    con.query(sql, values)...
    res.send(rows)
    ...
    })
*/
app.post('/api/createuser', async(req,res)=>{
  const accessToken = req.headers.authorization?.split(' ')[1];
  if (!accessToken){
    return res.status(401).send('Missing token');
  }
  try{
    const userInfoResponse = await fetch(GOOGLE_USERINFO_API, {
      headers:{
        'Authorization': `Bearer ${accessToken}`,
      },

    });
    if (!userInfoResponse.ok){
      return res.status(401).send('Invalid token');
    }
    const userInfo = await userInfoResponse.json();
    const userIdtoStore = userInfo.sub

    console.log(userIdtoStore)
  }catch(error){
    console.error(error)
  }

})
app.post('/api/authtest', async (req, res) =>{
const accessToken = req.headers.authorization?.split(' ')[1]; // Extract the token from Authorization header
console.log(accessToken)
    if (!accessToken) {
        return res.status(401).send('Missing token');
    }

    try {
        // Fetch user info using the access token
        const userInfoResponse = await fetch(GOOGLE_USERINFO_API, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!userInfoResponse.ok) {
            return res.status(401).send('Invalid token');
        }

        const userInfo = await userInfoResponse.json();
        const userId = userInfo.sub; // The user's unique Google ID
        
        
        // Query the database and ensure the user has access to their data
        const userData = await getUserData(userId); // Replace with actual DB query

        if (!userData) {
            return res.status(404).send('User not found');
        }

        // Send the user data back
        res.json(userData);

    } catch (error) {
        console.error('Token verification failed', error);
        res.status(401).send('Invalid token');
    }
});

const getUserData = async () =>{
    const userId = '239074623784'
    return { userId, name: 'test', email: 'random@random.com'}
}
// Serve static files from the React app, this allows us to not have 3 containers running and makes it easier to host
app.use(express.static(path.join(__dirname, "./bethel-social-client/dist")));

// Fallback to index.html for SPA routing
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "./bethel-social-client/dist", "index.html")
  );
});
const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log("Server started on port " + port);
});
