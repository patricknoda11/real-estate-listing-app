import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'antd';

/**
 * Listing Entry Component
 *  - displays thumbnail image for a listing
 *  - displays a single listings details
 * */
const ListingEntry = ({ children }) => {
  const {
    address,
    price,
    type,
    numRooms,
    numBathrooms,
    interiorSize,
    landSize,
    imageUrl,
  } = children;
  return (
    <Card
      hoverable
      style={{ width: '100%', height: '10%' }}
      cover={
        imageUrl ? (
          <Image alt="listing-thumbnail" src={imageUrl} width={240} />
        ) : null
      }
    >
      <Card.Meta
        title={address}
        description={
          <>
            <p>Price: ${price}</p>
            <p>Type: {type}</p>
            <p>Rooms: {numRooms}</p>
            <p>Bathrooms: {numBathrooms}</p>
            <p>Interior Size: {interiorSize} sqft</p>
            <p>Land Size: {landSize} sqft</p>
          </>
        }
      />
    </Card>
  );
};

ListingEntry.propTypes = {
  children: PropTypes.shape({
    address: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    numRooms: PropTypes.number.isRequired,
    numBathrooms: PropTypes.number.isRequired,
    interiorSize: PropTypes.number.isRequired,
    landSize: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default ListingEntry;
