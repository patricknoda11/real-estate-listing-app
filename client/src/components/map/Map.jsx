import React from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Spin } from 'antd';

// Import Styles:
import './Map.scss';

// Import Components:
import PopupMarker from './PopupMarker';

/**
 * Reusuable Map Component utilizng Open Sourece Javascript Library Leaflet
 */
const Map = ({ center, zoom, scrollZoom, markers }) => {
  const isLoading = !center;
  return isLoading ? (
    <Spin className="load-spinner" size="large" />
  ) : (
    <MapContainer
      className="map-container"
      center={center}
      zoom={zoom}
      scrollWheelZoom={scrollZoom}
    >
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
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
  loading: PropTypes.bool,
  zoom: PropTypes.number,
  scrollZoom: PropTypes.bool,
  markers: PropTypes.arrayOf(PropTypes.object),
};

Map.defaultProps = {
  center: { lat: 49.2827, lng: 123.1207 }, // Default to Vancouver, BC
  loading: false,
  zoom: 11,
  scrollZoom: true,
  markers: [],
};

export default Map;
