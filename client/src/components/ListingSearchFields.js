import React, { Fragment, useState } from "react";

const ListingSearchFields = () => {
  const [ownerPhoneNumber, setOwnerPhoneNumber] = useState("");
  const [pricing, setPricing] = useState("");

  const listingSearchRequest = (e) => {
    e.preventDefault();
    // fetch request --> server side!!!

    // render

    // clear the text box entrys back default
    setOwnerPhoneNumber("");
    setPricing("");
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Search Listing </h1>
      <form onSubmit={listingSearchRequest}>
        <div className="form-control">
          <label>Phone Number</label>
          <input
            type="text"
            placeholder="Enter Owner Phone Number"
            className="form-control"
            value={ownerPhoneNumber}
            onChange={(e) => setOwnerPhoneNumber(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Pricing </label>
          <input
            type="text"
            placeholder="Enter Price Range"
            className="form-control"
            value={pricing}
            onChange={(e) => setPricing(e.target.value)}
          />
        </div>
        <div className="form-control form-control-check">
          <label>Display Interior Size </label>
          <input type="checkbox" />
        </div>
        <button className="btn btn-success">Search</button>
      </form>
    </Fragment>
  );
};

export default ListingSearchFields;
