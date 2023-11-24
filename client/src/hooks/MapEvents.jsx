import { useMapEvents } from 'react-leaflet';
import PropTypes from 'prop-types';

/**
 * Custom Map Events Hook
 */
const MapEvents = ({ onBoundsChange }) => {
  useMapEvents({
    moveend: (e) => onBoundsChange(e.target.getBounds()),
    zoomend: (e) => onBoundsChange(e.target.getBounds()),
  });
  return null;
};

MapEvents.propTypes = {
  onBoundsChange: PropTypes.func.isRequired,
};

MapEvents.defaultProps = {
  onBoundsChange: () => {},
};

export default MapEvents;
