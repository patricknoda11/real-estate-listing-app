import axios from 'axios';

/**
 * Sends an HTTP request to the backend server.
 * @param {string} type - The type of the request (get, post, put, delete).
 * @param {string} url - The endpoint to send the request to.
 * @param {Object} payload - The data to send with the request.
 * @returns {Promise} - A promise that resolves to the response of the request.
 */
export default sendRequest = async (type, url, payload = {}) => {
  const baseUrl = process.env.REACT_APP_BACKEND_URL;

  const fullUrl = `${baseUrl}/${url}`;

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
