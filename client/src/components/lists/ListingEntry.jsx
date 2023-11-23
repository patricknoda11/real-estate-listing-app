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
    listingAddress,
    city,
    zipCode,
    price,
    type,
    numBedrooms,
    numBathrooms,
    interiorSize,
    landSize,
    url,
  } = children;
  return (
    <Card
      hoverable
      style={{ width: '100%', height: '10%' }}
      cover={
        url ? <Image alt="listing-thumbnail" src={url} width={240} /> : null
      }
    >
      <Card.Meta
        title={`${listingAddress}, ${city}, ${zipCode}`}
        description={
          <>
            <p>Price: ${price}</p>
            <p>Type: {type}</p>
            <p>Rooms: {numBedrooms}</p>
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
