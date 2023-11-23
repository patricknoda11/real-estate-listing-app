const { v4: uuidv4 } = require('uuid');

/**
 * generates robust & universally unique identifiers
 * @returns {string} - a unique id of 36 characters
 */
const generateUniqueId = () => uuidv4();

module.exports = {
  generateUniqueId
};
