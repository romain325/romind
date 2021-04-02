const express = require('express');
const artController = require('./articles.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    // GET /api/articles - Get list of folder
    .get(artController.listFolder);

router.route('/:folder')
    // GET /api/articles/:folder - Get list of articles
    .get(artController.listFiles);

router.route('/:folder/:file')
    // GET /api/articles/:folder/:file - Get article content
    .get(artController.getFile)

module.exports = router;