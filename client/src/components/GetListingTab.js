import React, { useState } from "react";
import {MenuItem, Select} from "@mui/material";

const GetListingTab = () => {
  let [ownerName, setOwnerName] = useState("");
  let [listingAddress, setListingAddress] = useState("");
  let [agentEmail, setAgentEmail] = useState("");
  let [price, setPrice] = useState("");
  let [location, setLocation] = useState("");
  let [type, setType] = useState("");
  let [numberOfRooms, setNumberOfRooms] = useState("");
  let [numberOfBathrooms, setNumberOfBathrooms] = useState("");
  let [interiorSize, setInteriorSize] = useState("");
  let [landSize, setLandSize] = useState("");

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const clearEntries = () => {
    setOwnerName("");
    setLocation("");
    setAgentEmail("");
    setPrice("");
    setLocation("");
    setType("");
    setNumberOfRooms("");
    setNumberOfBathrooms("");
    setInteriorSize("");
    setLandSize("");
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
       ownerName,
       listingAddress,
       agentEmail,
       price,
       location,
       type,
       numberOfRooms,
       numberOfBathrooms,
       interiorSize,
       landSize,
      };
      await fetch("http://localhost:5013/user/listing/", {
        method: "GET",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      alert("listing was successfully searched");
      clearEntries();
    } catch (error) {
      alert(error.message);
      clearEntries();
    }
  };

  return (
      <div className="flex-container-agent">
        <h1>Search Listings</h1>
        <div className="content">
          <form onSubmit={onSubmitForm}>
            <div className="form-group">
              <label>Owner Name</label>
              <input
                  type="text"
                  placeholder="e.g. John Harold"
                  className="form-control"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label> Listing Address </label>
              <input
                  type="text"
                  placeholder="e.g. 7788 Lucas Rd, Richmond"
                  className="form-control"
                  value={listingAddress}
                  onChange={(e) => setListingAddress(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Agent Email </label>
              <input
                  type="email"
                  placeholder="e.g. johnsnow@gail.com"
                  className="form-control"
                  value={agentEmail}
                  onChange={(e) => setAgentEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label> Price</label>
              <input
                  type="number"
                  placeholder="e.g. 1000000"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                  type="number"
                  placeholder="e.g. Canada"
                  className="form-control"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Age"
                  onChange={handleChange}
              >
                <MenuItem value={"single house"}>single house</MenuItem>
                <MenuItem value={"apartment"}>apartment</MenuItem>
                <MenuItem value={"town house"}>town house</MenuItem>
              </Select>
            </div>
            <div className="form-group">
              <label>Number of Rooms</label>
              <input
                  type="number"
                  placeholder="e.g. 5"
                  className="form-control"
                  value={numberOfRooms}
                  onChange={(e) => setNumberOfRooms(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Number of Bathrooms</label>
              <input
                  type="number"
                  placeholder="e.g. 2"
                  className="form-control"
                  value={numberOfBathrooms}
                  onChange={(e) => setNumberOfBathrooms(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Interior Size</label>
              <input
                  type="number"
                  placeholder="e.g. 125"
                  className="form-control"
                  value={interiorSize}
                  onChange={(e) => setInteriorSize(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Land Size</label>
              <input
                  type="number"
                  placeholder="e.g. 140"
                  className="form-control"
                  value={landSize}
                  onChange={(e) => setLandSize(e.target.value)}
              />
            </div>
            <button className="btn btn-primary">search</button>
          </form>
        </div>
      </div>
  );
};

export default GetListingTab;