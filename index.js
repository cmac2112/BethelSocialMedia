require("dotenv").config();
const mysql = require("mysql");
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const multer = require('multer');

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

const GOOGLE_USERINFO_API = "https://www.googleapis.com/oauth2/v3/userinfo";
//const client = new OAuth2Client(process.env.CLIENT_ID);

// will need some sort of middleware to handle files in POST requests
// multer is the middleware, storing files is another issue

//we will need GET, PUT, and POST for profile bios
/*
const connectionConfig = {
  host: process.env.DB_HOST || '34.29.241.52',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || DB_USER,
  password: process.env.DB_PASSWORD || DB_PASSWORD,
  database: process.env.DB_DATABASE || "BCSocial",
};

*/
const connectionConfig = {
  host: 'localhost',
  port: 3306,
  user: 'dbuser',
  password: 'michon70',
  database: "BCSocial",
};
const con = mysql.createConnection(connectionConfig);

con.connect(function (err) {
  if (err) throw err;
  console.log("connected to mysql, database:" + connectionConfig.database);
});
con.query("USE BCSocial", function (err, result) {
  if (err) throw err;
  console.log("Using bcsocial database");
});


//######################################################################
//start of middlewares

//use this to ensure valid @bethelks domain
// ensure user is who they say they are
const validateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    console.log("missing token");
    return res.status(401).send({"message":"Missing token"});
  }
  try {
    const userInfoResponse = await fetch(GOOGLE_USERINFO_API, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!userInfoResponse.ok) {
      return res.status(401).send({"message":"Invalid token"});
    }

    const userInfo = await userInfoResponse.json();
    if (userInfo.hd !== "bethelks.edu") {
      return res.status(401).send({"message":"invalid email domain"});
    }
  } catch (error) {
    console.log("error here");
    return res.status(401).send({"message":"unable to authenticate email domain"});
  }


  try {
    const response = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?access_token=${token}`
    );

    if (!response.ok) {
      console.log("invalid token, response failed");
      return res.status(401).send({"message":"Invalid token"});
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
  return res.status(402).send({"message":"failed to get user info"})
}
  } catch (error) {
    console.error("Token validation error:", error);
    return res.status(401).send({"message":"Invalid token"});
  }
};
//end of middlewares
//########################################################################################
//post endpoints
app.get("/api/posts", validateToken, (req, res)=>{
  const limit = parseInt(req.query.limit) || 5;
  const offset = parseInt(req.query.offset) || 0;

  const sql = `
    SELECT post.*, users.profile_pic 
    FROM post 
    INNER JOIN users ON post.user_id = users.user_id 
    ORDER BY post.timestamp DESC 
    LIMIT ? OFFSET ?`;
  con.query(sql, [limit, offset], function (err, result){
    if(err){
      console.error('error fetching posts', err);
      res.status(500).send('error fetching posts');
    }
    res.json(result)
  })
})

app.get("/api/posts/:userid", validateToken, (req, res)=>{
  const limit = parseInt(req.query.limit) || 5;
  const offset = parseInt(req.query.offset) || 0;

  const sql = `
  SELECT post.*, users.profile_pic
  FROM post
  INNER JOIN users ON post.user_id = users.user_id WHERE post.user_id = ? ORDER BY post.timestamp DESC LIMIT ? OFFSET ?`;

  con.query(sql, [req.params.userid, limit, offset], function(err, result){
    if(err){
      console.error('error fetching posts', err);
      res.status(500).send({"message":"internal server error"})
    }
    res.json(result);
  })
})


//this endpoint allows a user to create a post on the site
app.post('/api/createpost', validateToken, upload.single('image'), async (req, res) => {
  const userId = req.userId;
  const username = req.name;
  const postText = req.body.postText;
  const postImage = req.file ? `/uploads/${req.file.filename}` : null;

  con.query('INSERT INTO post (user_id, name, post_text, post_image) VALUES (?, ?, ?, ?)', [userId, username, postText, postImage], function (err, result) {
    if (err) {
      console.error('Error inserting post:', err);
      return res.status(500).send('Error inserting post');
    }
    console.log('Post inserted:', result);
    res.status(201).send({"message":"Post created successfully"});
  });
});
//end of posts endpoints
//#######################################################################
//profile endpoints
//The post stuff for bio
app.post("/api/bio/:userid", validateToken,async(req, res)=>{
  console.log('request for ' + req.url)
  const userId = req.params.userid;
  const bio = req.body.bio;
  console.log("bio", bio);
  console.log("userId", userId);

  console.log('to the query')
  con.query('UPDATE users SET bio = ? WHERE user_id = ?', [bio, userId], function(err, result){
    if(err){
      console.error('error updating bio:', err);
      return res.status(500).send('Error updating bio');
    }
    console.log('Bio updated:', result);
    res.status(200).send({message:'Bio updated successfully'});
  })
});

//The get stuff for bio
app.get("/api/bio/:userid", validateToken, (req, res)=>{
  const userId = req.params.userid;
  console.log(userId)
  console.log('to the query')
  con.query('SELECT bio FROM users WHERE user_id = ?', [userId], function(err, result){
    if(err){
      console.error('error fetching bio:', err);
      return res.status(500).send('Error fetching bio');
    }
    console.log('Bio fetched:', result);
    res.send(JSON.stringify(result))
  })
});

app.get("/api/userpfp/:userid", validateToken, (req, res)=>{
  const userId = req.params.userid;
  con.query(`SELECT profile_pic FROM users WHERE user_id = ?`, [userId], function(err, result){
    if(err){
      console.error('error fetching', err)
      return res.status(500).send({error:"error fetching user pfp"})
    }
    res.status(200).send(result);
  });
});

// this will automatically create a user in our data base when they log in for the first time
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


app.get('/proxy/uploads/:filename', validateToken, (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);
  res.sendFile(filePath);
});
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