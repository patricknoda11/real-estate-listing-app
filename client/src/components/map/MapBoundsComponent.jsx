import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMap } from 'react-leaflet';

/**
 * The currently used react-leaflet version only supports useMap hooks within child components of the MapContainer component. This component is a workaround to use the useMap hook outside of the MapContainer component.
 */
const MapBoundsComponent = ({ onBoundsChange }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    // Utilization of Map instance:
    const bounds = map.getBounds();
    console.log('line15', bounds);
    onBoundsChange(bounds);
  }, [map]);

  return null;
};

MapBoundsComponent.propTypes = {
  onBoundsChange: PropTypes.func.isRequired,
};

MapBoundsComponent.defaultProps = {
  onBoundsChange: () => {},
};

export default MapBoundsComponent;
