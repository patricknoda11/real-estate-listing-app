import React from 'react';
import PropTypes from 'prop-types';
import { Marker, Popup } from 'react-leaflet';

// Import styles:
import './Map.scss';

/**
 * Marker Component which renders a marker on the map with a popup
 */
const PopupMarker = ({ lat, lng, content }) => (
  <Marker position={{ lat, lng }}>
    <Popup>{content}</Popup>
  </Marker>
);

PopupMarker.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
};

export default PopupMarker;
