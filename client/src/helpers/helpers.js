/**
 * Retreives the coordinates of the current user
 * @param {function} callback - the function to call when the coordinates are retrieved
 * @returns {Promise} - A promise that resolves to the coordinates of the current user
 */
export const getCoordinates = async (callback) => {
  try {
    const {
      coords: { latitude, longitude },
    } = await navigator?.geolocation?.getCurrentPosition(callback);
    return { lat: latitude, lng: longitude };
  } catch (error) {
    console.log(error);
    return { lat: 49.2827, lng: -123.1207 }; // Default to Vancouver
  }
};
