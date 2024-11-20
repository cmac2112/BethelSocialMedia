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

const GOOGLE_USERINFO_API = "https://www.googleapis.com/oauth2/v3/userinfo";
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

// will need some sort of middleware to handle files in POST requests
// multer is the middleware, storing files is another issue

//we will need GET and POST for comments -- angel
//we will need GET, PUT, and POST for profile bios
const connectionConfig = {
  host: process.env.DB_HOST || "Cmac24",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || DB_USER,
  password: process.env.DB_PASSWORD || DB_PASSWORD,
  database: process.env.DB_DATABASE || "BCSocial",
};

const con = mysql.createConnection(connectionConfig);

con.connect(function (err) {
  if (err) throw err;
  console.log("connected to mysql, database:" + connectionConfig.database);
});
con.query("USE BCSocial", function (err, result) {
  if (err) throw err;
  console.log("Using jobSite database");
});
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

//use this to ensure valid @bethelks domain
// ensure user is who they say they are
const validateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    console.log("missing token");
    return res.status(401).send("Missing token");
  }
  try {
    const userInfoResponse = await fetch(GOOGLE_USERINFO_API, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!userInfoResponse.ok) {
      return res.status(401).send("Invalid token");
    }

    const userInfo = await userInfoResponse.json();
    if (userInfo.hd !== "bethelks.edu") {
      return res.status(401).send("invalid email domain");
    }
  } catch (error) {
    console.log("error here");
    return res.status(401).send("unable to authenticate email domain");
  }


  try {
    const response = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?access_token=${token}`
    );

    if (!response.ok) {
      console.log("invalid token, response failed");
      return res.status(401).send("Invalid token");
    }

    const tokenInfo = await response.json();
    try{
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  });
    const userInfo = await userInfoResponse.json();
    console.log(userInfo)
    req.img = userInfo.picture
    req.name = userInfo.name
    req.userId = tokenInfo.sub; // Attach token info to the request object
    next(); // Proceed to the next middleware or route handler
}catch(error){
  console.error("userInfo error", error);
  return res.status(402).send("failed to get user info")
}
  } catch (error) {
    console.error("Token validation error:", error);
    return res.status(401).send("Invalid token");
  }
};

app.post("/api/createuser", validateToken, async(req,res)=>{
  const accessToken = req.headers.authorization?.split(" ")[1]

  if (!accessToken) {
    return res.status(401).send("Missing token");
  }
  const username = req.name
  const userId = req.userId
  const pfp = req.img
  const bio = req.body.bio

  con.query(`INSERT IGNORE INTO users (user_id, name, profile_pic, bio) VALUES (?, ?, ?, ?)`, [userId, username, pfp, bio], function(err, result){
    if(err){
      console.error('error creating user:', err);
      return res.send(500).send('Error creating user')
    }
    console.log('User Created:', result);
    res.status(201).send(JSON.stringify('User created successfully'));
  })
})

app.post("/api/createpost", validateToken, async(req,res)=>{
  const accessToken = req.headers.authorization?.split(" ")[1]

  if (!accessToken) {
    return res.status(401).send("Missing token");
  }
  const username = req.name
  const userId = req.userId; //req.userId comes from the validateToken middleware function
  const postText = req.body.postText;
  const postImage = req.body.image;
  con.query(`INSERT INTO post (user_id, name, post_text, post_image) VALUES (?, ?, ?, ?)`, [userId, username, postText, postImage], function(err, result) {
    if (err) {
      console.error('Error inserting post:', err);
      return res.status(500).send('Error inserting post, do you exist?');
    }
    console.log('Post inserted:', result);
    res.status(201).send(JSON.stringify('Post created successfully'));
  });
})

const getUserData = async () => {
  const userId = "239074623784";
  return { userId, name: "test", email: "random@random.com" };
};
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
