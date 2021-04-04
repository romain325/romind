const express = require('express');
const projController = require('./projects.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    // GET /api/projects - Get all projects with default tags
    .get(projController.getAll)
    // POST /api/projects - Get Specified Projects
    // curl -X POST -H "Content-Type: application/json" -d '{"topics": ["romind-pinned"]}' http://localhost:5000/api/projects
    .post(projController.getFromTopics);

router.route('/:topic')
    .get(projController.getOneTopic);

module.exports = router;