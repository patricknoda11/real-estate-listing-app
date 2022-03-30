import React, { Fragment, useState } from "react";
import { MenuItem, Select } from "@mui/material";

const GetAgentsTab = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [preferredMeetingDuration, setPreferredMeetingDuration] = useState("");
  const [
    preferredInPersonMeetingLocation,
    setPreferredInPersonMeetingLocation,
  ] = useState("");

  const clearEntries = () => {
    setPhoneNumber("");
    setEmail("");
    setName("");
    setPreferredMeetingDuration("");
    setPreferredInPersonMeetingLocation("");
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        phoneNumber,
        email,
        name,
        preferredInPersonMeetingLocation,
      };
      const response = await fetch(" http://localhost:5013/user/agent/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
      clearEntries();
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleChange = (event) => {
    setPreferredInPersonMeetingLocation(event.target.value);
  };

  return (
      <Fragment>
        <h1 className="text-center mt-5">Get Agent </h1>
        <form onSubmit={onSubmitForm}>
          <div className="form-control">
            <label>Phone Number</label>
            <input
                type="text"
                placeholder="Enter phone number"
                className="form-control"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>Email </label>
            <input
                type="email"
                placeholder="Enter email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>Name</label>
            <input
                type="text"
                placeholder="Enter name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>Preferred Meeting Duration</label>
            <input
                type="number"
                placeholder="Enter duration"
                className="form-control"
                value={preferredMeetingDuration}
                onChange={(e) => setPreferredMeetingDuration(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>Preferred Meeting location</label>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={preferredInPersonMeetingLocation}
                label="Age"
                onChange={handleChange}
            >
              <MenuItem value={"online"}>online</MenuItem>
              <MenuItem value={"in-person"}>in-person</MenuItem>
            </Select>
          </div>
          <button className="btn btn-success">Get Agent</button>
        </form>
      </Fragment>
  );
};

export default GetAgentsTab;
