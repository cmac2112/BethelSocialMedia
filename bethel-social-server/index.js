const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Dummy data for testing purposes
let posts = [
    {
        id: 1,
        title: 'First Post',
        content: 'This is the content of the first post.',
        author: 'Author 1',
        image_path: 'uploads/sample1.png',
    },
    {
        id: 2,
        title: 'Second Post',
        content: 'This is the content of the second post.',
        author: 'Author 2',
        image_path: 'uploads/sample2.png',
    },
];

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

// GET route to retrieve all posts
app.get('/posts', (req, res) => {
    const modifiedPosts = posts.map(post => ({
        ...post,
        image_path: post.image_path ? `http://localhost:${port}/${post.image_path}` : null,
    }));
    res.json(modifiedPosts);
});

// POST route to handle post creation and image upload
app.post('/upload', upload.single('image'), (req, res) => {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
        return res.status(400).send('Missing form fields.');
    }

    const imagePath = req.file ? `uploads/${req.file.filename}` : null;

    const newPost = {
        id: posts.length + 1,
        title,
        content,
        author,
        image_path: imagePath,
    };

    posts.push(newPost);
    res.status(201).send(`Post added with ID: ${newPost.id}`);
});

// DELETE route to remove a post and its associated image
app.delete('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(post => post.id === postId);

    if (postIndex !== -1) {
        const postToDelete = posts[postIndex];

        // Delete image from filesystem if it exists
        if (postToDelete.image_path) {
            fs.unlink(postToDelete.image_path, (err) => {
                if (err) console.error('Error deleting file:', err);
            });
        }

        posts.splice(postIndex, 1);
        res.send(`Post with ID: ${postId} deleted successfully.`);
    } else {
        res.status(404).send('Post not found.');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
