import React from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer } from 'react-leaflet';

// Import Styles:
import './Map.scss';

// Import Components:
import PopupMarker from './PopupMarker';

/**
 * Reusuable Map Component utilizng Open Sourece Javascript Library Leaflet
 */
const Map = ({ center, zoom, scrollZoom, markers }) => {
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={scrollZoom}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((props) => (
        <PopupMarker {...props} />
      ))}
    </MapContainer>
  );
};

Map.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number,
  scrollZoom: PropTypes.bool,
  markers: PropTypes.arrayOf(PropTypes.object),
};

Map.defaultProps = {
  center: [49.2827, 123.1207], // Default to Vancouver, BC
  zoom: 11,
  scrollZoom: true,
  markers: [],
};

export default Map;
