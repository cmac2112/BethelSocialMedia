require("dotenv").config();
const mysql = require("mysql");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const connectionConfig = {
    host: '34.29.241.52',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || DB_USER,
  password: process.env.DB_PASSWORD || DB_PASSWORD,
};

const con = mysql.createConnection(connectionConfig);

con.connect(function (err) {
  if (err) throw err;
  console.log("connected to mysql, database:" + connectionConfig.database);
});
con.query("DROP DATABASE IF EXISTS BCSocial", function (err, result) {
  if (err) throw err;
  console.log("Database dropped");
});
con.query("CREATE DATABASE IF NOT EXISTS BCSocial", function (err, result) {
  if (err) throw err;
  console.log("Database created");
});
con.query("USE BCSocial", function (err, result) {
  if (err) throw err;
  console.log("Using jobSite database");
});

/*

Column	Type	Indexing
user_id	INT (PK)	Indexed (primary)
display_name	VARCHAR	Indexed
name	VARCHAR	
profile_pic	VARCHAR (URL)	
bio	TEXT

Post Table (Partitioned)
Column	Type	Indexing
post_id	INT (PK)	Indexed (primary)
user_id	INT (FK)	Indexed (foreign)
timestamp	TIMESTAMP	Indexed
post_text	TEXT	
post_content	VARCHAR (URL)	

Post_User Table (With Composite Key)
Column	Type	Indexing
user_id	INT (FK)	Indexed (foreign)
post_id	INT (FK)	Indexed (foreign)
action	VARCHAR	
timestamp	TIMESTAMP	
Primary Key	(user_id, post_id, action)	Composite key */
con.query(`CREATE TABLE IF NOT EXISTS users(
    user_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(50),
    profile_pic LONGTEXT,
    bio LONGTEXT,
    banned INT NOT NULL DEFAULT 0,
    administrator INT NOT NULL DEFAULT 0,
    UNIQUE KEY (name)
    )`, function(err, res){ //if banned == 1, then the user is banned and do not allow them to do anything
        if(err) throw err;
        console.log('created table users', res)
    })
con.query(`CREATE TABLE IF NOT EXISTS post(
    post_id INT AUTO_INCREMENT PRIMARY KEY ,
    user_id VARCHAR(255) NOT NULL,
    name VARCHAR(50),
    timestamp TIMESTAMP DEFAULT NOW(),
    post_text LONGTEXT,
    post_image LONGTEXT,
    like_number INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (name) REFERENCES users(name) ON DELETE CASCADE)`, function(err, res){
        if(err) throw err;
        console.log('created posts table', res)
    })
con.query(`CREATE TABLE IF NOT EXISTS Post_User (
    user_id VARCHAR(255),                            -- Foreign Key referencing User
    post_id INT,                            -- Foreign Key referencing Post
    action VARCHAR(20),                     -- Type of action (e.g., 'like', 'share')
    timestamp TIMESTAMP DEFAULT NOW(), -- When the action occurred
    PRIMARY KEY (user_id, post_id, action), -- Composite Primary Key to ensure unique action per user per post
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,   -- Cascade delete when User is deleted
    FOREIGN KEY (post_id) REFERENCES post(post_id) ON DELETE CASCADE    -- Cascade delete when Post is deleted
)`, function(err, res){
        if(err) throw err;
        console.log('created user interactions table', res)
    })

// Insert dummy data into users table
const users = [
    [1, 'John Doe', 'https://example.com/pic1.jpg', 'Bio of John Doe'],
    [2, 'Jane Smith', 'https://example.com/pic2.jpg', 'Bio of Jane Smith'],
    [3, 'Alice Johnson', 'https://example.com/pic3.jpg', 'Bio of Alice Johnson'],
    [4, 'Bob Brown', 'https://example.com/pic4.jpg', 'Bio of Bob Brown'],
    [5, 'Charlie Davis', 'https://example.com/pic5.jpg', 'Bio of Charlie Davis'],
    [6, 'Diana Evans', 'https://example.com/pic6.jpg', 'Bio of Diana Evans'],
    [7, 'Eve Foster', 'https://example.com/pic7.jpg', 'Bio of Eve Foster'],
    [8, 'Frank Green', 'https://example.com/pic8.jpg', 'Bio of Frank Green'],
    [9, 'Grace Harris', 'https://example.com/pic9.jpg', 'Bio of Grace Harris'],
    [10, 'Hank Irving', 'https://example.com/pic10.jpg', 'Bio of Hank Irving']
];

users.forEach(user => {
    con.query('INSERT INTO users (user_id, name, profile_pic, bio) VALUES (?, ?, ?, ?)', user, function(err, res) {
        if (err) throw err;
        console.log('Inserted user', res);
    });
});

// Insert dummy data into post table
const posts = [
    [1, 'Post text 1', 'https://example.com/content1.jpg'],
    [2, 'Post text 2', 'https://example.com/content2.jpg'],
    [3, 'Post text 3', 'https://example.com/content3.jpg'],
    [4, 'Post text 4', 'https://example.com/content4.jpg'],
    [5, 'Post text 5', 'https://example.com/content5.jpg'],
    [6, 'Post text 6', 'https://example.com/content6.jpg'],
    [7, 'Post text 7', 'https://example.com/content7.jpg'],
    [8, 'Post text 8', 'https://example.com/content8.jpg'],
    [9, 'Post text 9', 'https://example.com/content9.jpg'],
    [10, 'Post text 10', 'https://example.com/content10.jpg']
];

posts.forEach(post => {
    con.query('INSERT INTO post (user_id, post_text, post_image) VALUES (?, ?, ?)', post, function(err, res) {
        if (err) throw err;
        console.log('Inserted post', res);
    });
});

const postUserActions = [
    [1, 1, 'like'],
    [2, 2, 'share'],
    [3, 3, 'like'],
    [4, 4, 'share'],
    [5, 5, 'like'],
    [6, 6, 'share'],
    [7, 7, 'like'],
    [8, 8, 'share'],
    [9, 9, 'like'],
    [10, 10, 'share']
];

postUserActions.forEach(action => {
    con.query('INSERT INTO Post_User (user_id, post_id, action) VALUES (?, ?, ?)', action, function(err, res) {
        if (err) throw err;
        console.log('Inserted post user action', res);
    });
});


console.log('successfully created bcsocial database')
con.end();