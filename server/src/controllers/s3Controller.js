const AWS = require('../config/aws');
const env = require('dotenv');

env.config();
const s3 = new AWS.S3();

/**
 * Controller which generates a presigned url for uploading images to S3
 */
const generatePresignedUrl = async (req, res) => {
  const { fileName, fileType } = req.body ?? {};

  // Set S3 Parameters:
  const s3Params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  try {
    // Generate a presigned url:
    const presignedUrl = await s3.getSignedUrlPromise('putObject', s3Params);
    const imageUrl = `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${filename}`;

    // Return the presigned url:
    res.status(200).json({ presignedUrl, imageUrl });
  } catch (error) {
    // Log error on console:
    console.error('Error creating presigned URL: ' + error);
    // Return an error message:
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  generatePresignedUrl
};
