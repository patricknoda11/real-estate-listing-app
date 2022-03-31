import { useState } from "react";

const CreateListingTab = () => {
  const [numBathrooms, setNumBathrooms] = useState("");
  const [interiorSize, setInteriorSize] = useState("");
  const [landSize, setLandSize] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [maximumPrice, setMaximumPrice] = useState("");

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
      // await fetch("http://localhost:5013/listings/", { // TODO: fix this
      //   method: "POST",
      //   mode: "cors",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(body),
      // });
      // clearEntries();
    } catch (error) {
      alert(error.message);
      clearEntries();
    }
  };

  return (
    <div className="flex-container-agent">
      <h1>Search for Listings</h1>
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
            />
          </div>
          <button className="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateListingTab;
