import './Listings.scss';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as ReactBootStrap from 'react-bootstrap';
import Map from '../../components/map/Map';

const Listings = () => {
  const GET_REQUEST_ROUTE = 'http://localhost:5013/listings';
  const DELETE_REQUEST_ROUTE = `http://localhost:5013/listings/`;
  const [numBathrooms, setNumBathrooms] = useState('');
  const [interiorSize, setInteriorSize] = useState('');
  const [landSize, setLandSize] = useState('');
  const [startingPrice, setStartingPrice] = useState('');
  const [maximumPrice, setMaximumPrice] = useState('');
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();

  const clearEntries = () => {
    setNumBathrooms('');
    setInteriorSize('');
    setLandSize('');
    setStartingPrice('');
    setMaximumPrice('');
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const queryString = `?numberOfBathrooms=${numBathrooms}&interiorSize=${interiorSize}&landSize=${landSize}&startPrice=${startingPrice}&endPrice=${maximumPrice}`;
      const response = await fetch(GET_REQUEST_ROUTE + queryString);
      const parsedResponse = await response.json();
      setEntries(parsedResponse);
    } catch (error) {
      alert(error.message);
    } finally {
      clearEntries();
    }
  };

  const deleteListing = async (listingAddress) => {
    try {
      await fetch(DELETE_REQUEST_ROUTE + listingAddress, {
        method: 'DELETE',
      });
      setEntries(
        entries.filter((entry) => entry.listingAddress !== listingAddress)
      );
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container-listings">
      <h1>Search Listings</h1>
      <div className="content">
        <form onSubmit={onSubmitForm}>
          <div className="form-group">
            <label>Number of Bathrooms (minnimum)</label>
            <input
              type="number"
              placeholder="e.g. 3"
              className="form-control"
              value={numBathrooms}
              onChange={(e) => setNumBathrooms(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Interior Size (minnimum sq-ft)</label>
            <input
              type="number"
              placeholder="e.g. 5000"
              className="form-control"
              value={interiorSize}
              onChange={(e) => setInteriorSize(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Land Size (minnimum sq-ft)</label>
            <input
              type="number"
              placeholder="e.g. 10000"
              className="form-control"
              value={landSize}
              onChange={(e) => setLandSize(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Starting Price</label>
            <input
              type="number"
              placeholder="e.g. 200000"
              className="form-control"
              value={startingPrice}
              onChange={(e) => setStartingPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Maximum Price</label>
            <input
              type="number"
              placeholder="e.g. 1000000"
              className="form-control"
              value={maximumPrice}
              onChange={(e) => setMaximumPrice(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-success">Search</button>
        </form>
        <ReactBootStrap.Table striped bordered hover>
          <thead>
            <tr>
              <th>Agent Email</th>
              <th>Address</th>
              <th>Location</th>
              <th>Price</th>
              <th>Bathrooms</th>
              <th>Bedrooms</th>
              <th>Interior size (sq-ft)</th>
              <th>Land size (sq-ft)</th>
              <th>Learn More</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, i) => (
              <tr key={i}>
                <td>{entry.agentEmail}</td>
                <td>{entry.listingAddress}</td>
                <td>{entry.location}</td>
                <td>${entry.price}</td>
                <td>{entry.numberOfBathrooms}</td>
                <td>{entry.numberOfRooms}</td>
                <td>{entry.interiorSize}</td>
                <td>{entry.landSize}</td>
                <td>
                  <Link to={`/listings/${entry.listingAddress}`}>
                    Learn More
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      navigate(`/listings/${entry.listingAddress}`)
                    }
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteListing(entry.listingAddress)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </ReactBootStrap.Table>
      </div>
    </div>
  );
};

export default Listings;
