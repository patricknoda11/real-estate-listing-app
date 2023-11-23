const { v4: uuidv4 } = require('uuid');
const NodeGeocoder = require('node-geocoder');

const geocoder = NodeGeocoder({
  provider: 'openstreetmap'
});

/**
 * generates robust & universally unique identifiers
 * @returns {string} - a unique id of 36 characters
 */
const generateUniqueId = () => uuidv4();

/**
 * Returns the latitude and longitude of the specified address
 * @param {string} address - the address
 * @param {string} city - the city
 *  @param {string} region - the region/province
 * @param {string} zipcode - the zipcode/postalcode
 * @param {string} country - the country
 * @returns {Promise<object>} - the latitude and longitude of the specified address
 */
const getLatLng = async ({ address, city, zipcode, country }) => {
  const res = await geocoder.geocode({
    address,
    city,
    zipcode,
    country
  });
  return {
    latitude: res[0]?.latitude,
    longitude: res[0]?.longitude
  };
};

module.exports = {
  generateUniqueId,
  getLatLng
};
