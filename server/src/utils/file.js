const env = require('dotenv');

env.config();

/**
 * Creates a permanent file url for the uploaded image
 * @param {string} fileName
 * @returns {string} - the permanent file url
 */
const createPermanentFileUrl = (fileName) =>
  `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}amazonaws.com/${filename}`;

module.exports = {
  createPermanentFileUrl
};
