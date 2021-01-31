const express = require('express');
const controller = require('./config_file_getter.controller');

const router = express.Router();

router.get("/particlesConfig", controller.getParticlesConfig);
router.get('/noodeljs/profile', controller.getNoodleProfile);

module.exports = router;