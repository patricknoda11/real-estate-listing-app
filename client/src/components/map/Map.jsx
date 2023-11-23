import React from 'react';
import PropTypes from 'prop-types';
import Leaflet from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Spin } from 'antd';

// Import Styles:
import './Map.scss';

// Import Components:
import MapEvents from '../../hooks/MapEvents';
import MapBoundsComponent from './MapBoundsComponent';

// Stackoverflow solution for missing default Marker icon:
const defaultIcon = new Leaflet.Icon({
  ...Leaflet.Icon.Default.prototype.options,
  shadowUrl: '/assets/marker-shadow.png',
  iconUrl: '/assets/marker-icon.png',
  iconRetinaUrl: '/assets/marker-icon-2x.png',
});

/**
 * Reusuable Map Component utilizng Open Sourece Javascript Library Leaflet
 */
const Map = ({
  center,
  zoom,
  scrollZoom,
  markers,
  onBoundsChange,
  onClusterMarkerClick,
  onMarkerClick,
}) => {
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
      <MarkerClusterGroup
        showCoverageOnHover={false}
        onClick={onClusterMarkerClick}
      >
        {markers.map(({ id, latitude, longitude }) => (
          <Marker
            key={id}
            id={id}
            position={{ lat: latitude, lng: longitude }}
            icon={defaultIcon}
            eventHandlers={{
              click: onMarkerClick(id),
            }}
          />
        ))}
      </MarkerClusterGroup>
      <MapBoundsComponent onBoundsChange={onBoundsChange} />
      <MapEvents onBoundsChange={onBoundsChange} />
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
  onBoundsChange: PropTypes.func,
  onMarkerClick: PropTypes.func,
  onClusterMarkerClick: PropTypes.func,
};

Map.defaultProps = {
  center: { lat: 49.2827, lng: 123.1207 }, // Default to Vancouver, BC
  loading: false,
  zoom: 11,
  scrollZoom: true,
  markers: [],
  onBoundsChange: () => {},
  onMarkerClick: () => {},
  onClusterMarkerClick: () => {},
};

export default Map;
