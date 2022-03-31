import { useState } from "react";

const UpdateListingTab = () => {
  const [prvOwnerPhoneNumber, setPrvOwnerPhoneNumber] = useState("");
  const [currOwnerPhoneNumber, setCurrOwnerPhoneNumber] = useState("");
  const [prvListingAddress, setPrvListingAddress] = useState("");
  const [currListingAddress, setCurrListingAddress] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [agentEmail, setAgentEmail] = useState("");
  const [price, setPrice] = useState("");
  const [prvLocation, setPrvLocation] = useState("");
  const [currLocation, setCurrLocation] = useState("");
  const [type, setType] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState("");
  const [numberOfBathrooms, setNumberOfBathrooms] = useState("");
  const [interiorSize, setInteriorSize] = useState("");
  const [landSize, setLandSize] = useState("");

  const clearEntries = () => {
    setPrvOwnerPhoneNumber("");
    setCurrOwnerPhoneNumber("");
    setPrvListingAddress("");
    setCurrListingAddress("");
    setOwnerName("");
    setAgentEmail("");
    setPrice("");
    setPrvLocation("");
    setCurrLocation("");
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
        prvOwnerPhoneNumber,
        currOwnerPhoneNumber,
        prvListingAddress,
        currListingAddress,
        ownerName,
        agentEmail,
        price,
        prvLocation,
        currLocation,
        type,
        numberOfRooms,
        numberOfBathrooms,
        interiorSize,
        landSize,
      };
      await fetch("http://localhost:5013/listings/", {
        method: "PUT",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      alert("listing was successfully updated");
      clearEntries();
    } catch (error) {
      alert(error.message);
      clearEntries();
    }
  };

  return (
    <div className="flex-container-agent">
      <h1>Update Listings</h1>
      <div className="content">
        <form onSubmit={onSubmitForm}>
          <div className="form-group">
            <label>Previous Owner Phone Number</label>
            <input
              type="number"
              placeholder="e.g. 6048305116"
              className="form-control"
              value={prvOwnerPhoneNumber}
              onChange={(e) => setPrvOwnerPhoneNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>
              Current Owner Phone Number (Enter same as above if not changed)
            </label>
            <input
              type="number"
              placeholder="e.g. 6048305116"
              className="form-control"
              value={currOwnerPhoneNumber}
              onChange={(e) => setCurrOwnerPhoneNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Previous Listing Address</label>
            <input
              type="text"
              placeholder="e.g. 12345 Alma st"
              className="form-control"
              value={prvListingAddress}
              onChange={(e) => setPrvListingAddress(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>
              Current Listing Address (Enter same as above if not changed)
            </label>
            <input
              type="text"
              placeholder="e.g. 12345 Alma st"
              className="form-control"
              value={currListingAddress}
              onChange={(e) => setCurrListingAddress(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Owner Name</label>
            <input
              type="number"
              placeholder="e.g. 6048302113"
              className="form-control"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Agent Email (Does not Change)</label>
            <input
              type="email"
              placeholder="e.g. dakotajohnson@gmail.com"
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
            <label>Previous Location</label>
            <input
              type="text"
              placeholder="e.g. Vancouver, BC"
              className="form-control"
              value={prvLocation}
              onChange={(e) => setPrvLocation(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Current Location</label>
            <input
              type="text"
              placeholder="e.g. Vancouver, BC"
              className="form-control"
              value={currLocation}
              onChange={(e) => setCurrLocation(e.target.value)}
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
            <label>Number Of Rooms</label>
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
              placeholder="e.g. 7000"
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
          <button className="btn btn-primary">search</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateListingTab;
