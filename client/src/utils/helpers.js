import Leaflet from 'leaflet';

/**
 * Returns true if the given coordinates are within the given map bounds, false otherwise
 * @param {number} latitude - the latitude of the coordinates to check
 * @param {number} longitude - the longitude of the coordinates to check
 * @param {Leaflet.LatLngBounds} bounds - the bounds to check against
 * @returns {boolean}
 */
export const isLatLngInMapBounds = ({ latitude, longitude, bounds }) => {
  const point = Leaflet.latLng(latitude, longitude);
  return bounds.contains(point);
};

/**
 * Returns true if the given object is empty, false otherwise
 * @param {object} obj
 * @returns {boolean}
 */
export const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};
