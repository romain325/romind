const express = require('express');
const articlesRoute = require('./articles/articles.route');
const projectsRoute = require('./projects/projects.route');
const config_files = require('./utils/config_file_getter.route');

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


// Config files getter
router.use('/', config_files);

// Mount Articles at /articles
router.use('/articles', articlesRoute);

router.use('/projects', projectsRoute);

module.exports = router;