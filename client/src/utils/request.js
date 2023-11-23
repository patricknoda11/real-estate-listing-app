import axios from 'axios';

// Constants:
const HOST = process.env.REACT_APP_BACKEND_HOST;
const PORT = process.env.REACT_APP_BACKEND_PORT;

/**
 * Sends an HTTP request to the backend server.
 * @param {string} type - The type of the request (get, post, put, delete).
 * @param {string} url - The endpoint to send the request to.
 * @param {Object} payload - The data to send with the request.
 * @returns {Promise} - A promise that resolves to the response of the request.
 */
export const sendRequest = async (type, url, payload = {}) => {
  const fullUrl = `http://${HOST}:${PORT}/${url}`;

  switch (type.toLowerCase()) {
    case 'get':
      return await axios.get(fullUrl);
    case 'post':
      return await axios.post(fullUrl, payload);
    case 'put':
      return await axios.put(fullUrl, payload);
    case 'delete':
      return await axios.delete(fullUrl);
    default:
      throw new Error(`Invalid request type: ${type}`);
  }
};

/**
 * Retrieves the presigned url for the specified file
 * @param {object} file - object containing file details
 * @returns {Promise<string>} - A promise that resolves to the presigned url
 */
export const getPresignedURL = async (file) => {
  const { name: fileName, type: fileType } = file ?? {};

  // Retrieve presigned url from server:
  const { data: presignedUrl } = await sendRequest(
    'post',
    's3/presigned-urls',
    {
      fileName,
      fileType,
    }
  );
  return presignedUrl;
};

/**
 * Uploads the specified files to AWS S3
 * @param {object[]} files - array of files to upload
 */
export const uploadFilesToS3 = async (files) => {
  const uploadPromises = files.map(async (file) => {
    const presignedUrl = await getPresignedURL(file);
    await axios.put(presignedUrl, file);
  });
  await Promise.all(uploadPromises);
};
