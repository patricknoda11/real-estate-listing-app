import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col } from 'antd';

// Import Components:
import Map from '../../components/map/Map';
import PaginatedList from '../../components/lists/PaginatedList';

/**
 * MapListings View
 */
const MapListings = () => {
  const { pathname } = useLocation();
  const visible = pathname === '/listings';

  const [coordinates, setCoordinates] = useState(null);

  // Initially retrieve the coordinates of the user, once the component mounts:
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) =>
        setCoordinates({ lat: latitude, lng: longitude })
    );
  }, []);

  // Stubs
  const markers = [];
  const listings = [];

  return (
    <Row className="map-container-listings">
      <Col span={16}>
        <Map center={coordinates} zoom={11} scrollZoom markers={markers} />
      </Col>
      <Col span={8}>
        <PaginatedList visible={visible} data={listings} />
      </Col>
    </Row>
  );
};

export default MapListings;
