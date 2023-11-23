import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

// Import Components:
import Map from '../../components/map/Map';
import PaginatedList from '../../components/lists/PaginatedList';

// Other Imports
import { isLatLngInMapBounds } from '../../helpers/helpers';

/**
 * MapListings View - combines a map and list view of real estate listings
 */
const MapListings = () => {
  const { pathname } = useLocation();
  const visible = pathname === '/listings';

  // Map Ref:
  const mapRef = useRef();

  // STATE ---------------------------------------------------------
  // Global State:
  const listings = useSelector((state) => state.listings.listings);

  // Local State:
  const [coordinates, setCoordinates] = useState(null);
  const [bounds, setBounds] = useState(null);
  const [selectedMarkers, setSelectedMarkers] = useState([]);

  // MEMOIZED VALUES -----------------------------------------------
  // Listings which are currently visible on the map:
  const visibleMarkers = useMemo(() => {
    // If the bounds are unknown, return an empty array:
    if (!bounds) return [];

    // otherwise, return all listings which are within the bounds:
    return Object.values(listings).filter(({ latitude, longitude }) =>
      isLatLngInMapBounds({ latitude, longitude, bounds })
    );
  }, [listings, bounds]);

  // Listings which are currently visible in paginated list:
  const visibleListings = useMemo(() => {
    // If no marker has been selected, return all listings which are visible:
    if (!selectedMarkers.length) return visibleMarkers;

    // Otherwise, return all listings which match one of any selected marker:
    const selectedIdSet = new Set(selectedMarkers);
    return visibleMarkers.filter(({ id }) => selectedIdSet.has(id));
  }, [visibleMarkers, selectedMarkers]);

  // HANDLERS ------------------------------------------------------
  // On map viewport change, update the bounds:
  const updateBounds = useCallback((bounds) => setBounds(bounds), []);

  // On single marker click, update the selected marker:
  const onMarkerClick = useCallback(
    (markerId) => () => setSelectedMarkers([markerId]),
    []
  );

  // On cluster marker click, update the selected marker:
  const onClusterMarkerClick = useCallback((cluster) => {
    const clusteredMarkers = cluster.layer.getAllChildMarkers();
    const ids = clusteredMarkers.map((marker) => marker?.options?.id);
    setSelectedMarkers(ids);
  }, []);

  // EFFECTS -------------------------------------------------------
  // Initially retrieve the coordinates of the user, once the component mounts:
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) =>
        setCoordinates({ lat: latitude, lng: longitude })
    );
  }, []);

  return (
    <Row className="map-container-listings">
      <Col span={16}>
        <Map
          center={coordinates}
          zoom={12}
          scrollZoom
          markers={visibleMarkers}
          onBoundsChange={updateBounds}
          onMarkerClick={onMarkerClick}
          onClusterMarkerClick={onClusterMarkerClick}
        />
      </Col>
      <Col span={8} style={{ height: '100%' }}>
        <PaginatedList visible={visible} data={visibleListings} />
      </Col>
    </Row>
  );
};

export default MapListings;
