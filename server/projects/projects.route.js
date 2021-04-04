const express = require('express');
const projController = require('./projects.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    // GET /api/projects - Get all projects
    .get(projController.getAll);


module.exports = router;