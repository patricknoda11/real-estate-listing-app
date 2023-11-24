const express = require('express');

const { generatePresignedUrl } = require('../controllers/s3Controller');

// Create s3 router:
const router = express.Router();

router.post('/generate-presigned-url', generatePresignedUrl);

module.exports = router;
