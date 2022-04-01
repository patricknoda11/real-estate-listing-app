import "./styles/Listings.scss";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import * as ReactBootStrap from "react-bootstrap";

const Listings = () => {
  const link = useRef("/listings/");
  const [numBathrooms, setNumBathrooms] = useState("");
  const [interiorSize, setInteriorSize] = useState("");
  const [landSize, setLandSize] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [maximumPrice, setMaximumPrice] = useState("");
  const [entries, setEntries] = useState([]);

  const onClickHandler = (e) => {
    e.preventDefault();
  };

  const clearEntries = () => {
    setNumBathrooms("");
    setInteriorSize("");
    setLandSize("");
    setStartingPrice("");
    setMaximumPrice("");
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        numBathrooms,
        interiorSize,
        landSize,
        startingPrice,
        maximumPrice,
      };
      const response = await fetch("http://localhost:5013/listings/", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parsedResponse = await response.json();
      setEntries(parsedResponse);
      //   clearEntries();
    } catch (error) {
      alert(error.message);
      //   clearEntries();
    }
  };

  return (
    <div className="flex-container-listings">
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
          <button className="btn btn-primary">Search</button>
        </form>
        <ReactBootStrap.Table striped bordered hover>
          <thead>
            <tr>
              <th>Agent Email</th>
              <th>Owner Phone #</th>
              <th>Address</th>
              <th>Location</th>
              <th>Price</th>
              <th># Bathrooms</th>
              <th>Interior size (sq-ft)</th>
              <th>Land size (sq-ft)</th>
              <th>Additional Details</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, i) => (
              <tr key={i}>
                <td>{entry.agentEmail}</td>
                <td>{entry.ownerPhoneNumber}</td>
                <td>{entry.listingAddress}</td>
                <td>{entry.location}</td>
                <td>{entry.price}</td>
                <td>{entry.numberOfBathrooms}</td>
                <td>{entry.interiorSize}</td>
                <td>{entry.landSize}</td>
                <td>
                  <Link to={`/listings/${entry.listingAddress}`}>
                    Learn More
                  </Link>
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
