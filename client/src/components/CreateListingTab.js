import { useState } from "react";

const CreateListingTab = () => {
  let [ownerPhoneNumber, setOwnerPhoneNumber] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [listingAddress, setListingAddress] = useState("");
  const [agentEmail, setAgentEmail] = useState("");
  let [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  let [numberOfRooms, setNumberOfRooms] = useState("");
  let [numberOfBathrooms, setNumberOfBathrooms] = useState("");
  let [interiorSize, setInteriorSize] = useState("");
  let [landSize, setLandSize] = useState("");

  const clearEntries = () => {
    setOwnerPhoneNumber("");
    setOwnerName("");
    setListingAddress("");
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
        ownerPhoneNumber,
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
      await fetch("http://localhost:5013/listings/", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      alert("The listing specified has been created");
      clearEntries();
    } catch (error) {
      alert(error.message);
      clearEntries();
    }
  };

  return (
    <div className="flex-container-agent">
      <h1>Create Listing</h1>
      <div className="content">
        <form onSubmit={onSubmitForm}>
          <div className="form-group">
            <label>Owner Phone Number</label>
            <input
              type="number"
              placeholder="e.g. 3"
              className="form-control"
              value={ownerPhoneNumber}
              onChange={(e) => setOwnerPhoneNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Owner Name</label>
            <input
              type="text"
              placeholder="e.g. Dakota Johnson"
              className="form-control"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Listing Address</label>
            <input
              type="text"
              placeholder="e.g. 12345 Alma St"
              className="form-control"
              value={listingAddress}
              onChange={(e) => setListingAddress(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Agent Email</label>
            <input
              type="email"
              placeholder="e.g. 1000000"
              className="form-control"
              value={agentEmail}
              onChange={(e) => setAgentEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Price</label>
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
              type="text"
              placeholder="e.g. Vancouver, BC"
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Type</label>
            <input
              type="text"
              placeholder="e.g. Duplex"
              className="form-control"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Number Of Bedrooms</label>
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
              placeholder="e.g. 4"
              className="form-control"
              value={numberOfBathrooms}
              onChange={(e) => setNumberOfBathrooms(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Interior Size (sq-ft)</label>
            <input
              type="number"
              placeholder="e.g. 5000"
              className="form-control"
              value={interiorSize}
              onChange={(e) => setInteriorSize(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Land Size (sq-ft)</label>
            <input
              type="number"
              placeholder="e.g. 10000"
              className="form-control"
              value={landSize}
              onChange={(e) => setLandSize(e.target.value)}
            />
          </div>
          <button className="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateListingTab;
