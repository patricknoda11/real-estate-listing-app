import "./styles/Owner.scss";
import React, { useState } from "react";

const Owner = () => {
  const [ownerPhoneNumber, setOwnerPhoneNumber] = useState("");
  const [ownerName, setOwnerName] = useState("");

  const clearEntries = () => {
    setOwnerPhoneNumber("");
    setOwnerName("");
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { ownerPhoneNumber, ownerName };
      await fetch("http://localhost:5013/user/owner", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      alert("Owner was added successfully");
      // clearEntries();
    } catch (error) {
      alert(error.message);
      // clearEntries();
    }
  };

  return (
    <div className="flex-container-owner">
      <h1>Register Owner</h1>
      <div className="content">
        <form onSubmit={onSubmitForm}>
          <div className="form-group">
            <label htmlFor="ownerPhoneNumberInput">Phone Number</label>
            <input
              id="ownerPhoneNumberInput"
              className="form-control"
              placeholder="e.g. 6048301191"
              value={ownerPhoneNumber}
              onChange={(e) => setOwnerPhoneNumber(e.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="ownerNameInput">Name</label>
            <input
              id="ownerNameInput"
              className="form-control"
              placeholder="e.g. Dakota Johnson"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
            ></input>
          </div>
          <button className="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Owner;
