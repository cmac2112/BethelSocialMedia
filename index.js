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
    console.log(tokenInfo)

    req.user = tokenInfo; // Attach token info to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Token validation error:", error);
    return res.status(401).send("Invalid token");
  }
};

app.post("/api/authtest", validateToken, async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1]; // Extract the token from Authorization header
  
  if (!accessToken) {
    return res.status(401).send("Missing token");
  }

    // Query the database and ensure the user has access to their data
    const userData = await getUserData(req.user); // Replace with actual DB query
    console.log(req.user.sub)
    if (!userData) {
      return res.status(404).send("User not found");
    }

    // Send the user data back
    res.json(userData);
});

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
