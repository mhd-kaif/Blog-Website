const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

const Post = mongoose.model('Post', new mongoose.Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now }
}));

app.get('/', async (req, res) => {
    const posts = await Post.find().sort('-date');
    res.send(posts);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
