import { useState } from "react";

const UpdateListingTab = () => {
  let [currOwnerPhoneNumber, setCurrOwnerPhoneNumber] = useState("");
  let [prvListingAddress, setPrvListingAddress] = useState("");
  let [currListingAddress, setCurrListingAddress] = useState("");
  let [ownerName, setOwnerName] = useState("")
  let [agentEmail, setAgentEmail] = useState("")
  let [price, setPrice] = useState("");
  let [prvLocation, setPrvLocation] = useState("");
  let [currLocation, setCurrLocation] = useState("");
  let [type, setType] = useState("");
  let [numberOfRooms, setNumberOfRooms] = useState("");
  let [numberOfBathrooms, setNumberOfBathrooms] = useState("");
  let [interiorSize, setInteriorSize] = useState("");
  let [landSize, setLandSize] = useState("");

  const clearEntries = () => {
    setCurrOwnerPhoneNumber("");
    setPrvListingAddress("");
    setCurrListingAddress("");
    setOwnerName("");
    setAgentEmail("")
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
        landSize
      };
      await fetch("http://localhost:5013/user/listing/", {
        method: "PUT",
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
              <label>Number of Rooms</label>
              <input
                  type="number"
                  placeholder="e.g. Canada"
                  className="form-control"
                  value={currOwnerPhoneNumber}
                  onChange={(e) => setCurrOwnerPhoneNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Number of Rooms</label>
              <input
                  type="number"
                  placeholder="e.g. Canada"
                  className="form-control"
                  value={prvListingAddress}
                  onChange={(e) => setPrvListingAddress(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Number of Rooms</label>
              <input
                  type="number"
                  placeholder="e.g. Canada"
                  className="form-control"
                  value={currListingAddress}
                  onChange={(e) => setCurrListingAddress(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Number of Rooms</label>
              <input
                  type="number"
                  placeholder="e.g. Canada"
                  className="form-control"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Number of Rooms</label>
              <input
                  type="number"
                  placeholder="e.g. Canada"
                  className="form-control"
                  value={agentEmail}
                  onChange={(e) => setAgentEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Number of Rooms</label>
              <input
                  type="number"
                  placeholder="e.g. Canada"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Number of Rooms</label>
              <input
                  type="number"
                  placeholder="e.g. Canada"
                  className="form-control"
                  value={prvLocation}
                  onChange={(e) => setPrvLocation(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Number of Rooms</label>
              <input
                  type="number"
                  placeholder="e.g. Canada"
                  className="form-control"
                  value={currLocation}
                  onChange={(e) => setCurrLocation(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Number of Rooms</label>
              <input
                  type="number"
                  placeholder="e.g. Canada"
                  className="form-control"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Number of Rooms</label>
              <input
                  type="number"
                  placeholder="e.g. Canada"
                  className="form-control"
                  value={numberOfRooms}
                  onChange={(e) => setNumberOfRooms(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Number of Rooms</label>
              <input
                  type="number"
                  placeholder="e.g. Canada"
                  className="form-control"
                  value={numberOfBathrooms}
                  onChange={(e) => setNumberOfBathrooms(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Number of Rooms</label>
              <input
                  type="number"
                  placeholder="e.g. Canada"
                  className="form-control"
                  value={interiorSize}
                  onChange={(e) => setInteriorSize(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Number of Rooms</label>
              <input
                  type="number"
                  placeholder="e.g. Canada"
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

