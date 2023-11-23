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
export default async (type, url, payload = {}) => {
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
