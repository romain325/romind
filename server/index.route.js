const express = require('express');
const articlesRoute = require('./articles/articles.route');


const router = express.Router();

// Answer API requests.
router.get('/', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the server!"}');
});


// Simple health checker
router.get("/check", (req,res) => {
    res.send("OK!")
});

// Mount Articles at /articles
router.use('/articles', articlesRoute)

module.exports = router;