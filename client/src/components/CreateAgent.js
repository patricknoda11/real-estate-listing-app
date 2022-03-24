import React, { Fragment, useState } from "react";

const CreateAgent = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [yearsExperience, setYearExperience] = useState("");
  const [preferredMeetingDuration, setPreferredMeetingDuration] = useState("");
  const [
    preferredInPersonMeetingLocation,
    setPreferredInPersonMeetingLocation,
  ] = useState("");

  const listingSearchRequest = (e) => {
    e.preventDefault();
    // fetch request --> server side!!!

    // render

    // clear the text box entrys back default
    setPhoneNumber("");
    setEmail("");
    setPassword("");
    setName("");
    setBirthday("");
    setYearExperience("");
    setPreferredMeetingDuration("");
    setPreferredInPersonMeetingLocation("");
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Register Agent </h1>
      <form>
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
          <label>Password </label>
          <input
            type="password"
            placeholder="Enter password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          <label>Birthday</label>
          <input
            type="date"
            placeholder="Enter date of birth: mm-dd-yyyy"
            className="form-control"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Years of Experience</label>
          <input
            type="number"
            placeholder="Enter years of experience"
            className="form-control"
            value={yearsExperience}
            onChange={(e) => setYearExperience(e.target.value)}
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
          <input
            type="radio"
            id="online"
            value="Online"
            onChange={(e) =>
              setPreferredInPersonMeetingLocation(e.target.value)
            }
          />
          <label for="online">Online</label>
          <br></br>
          <input
            type="radio"
            id="in_person"
            value="In-Person"
            onChange={(e) =>
              setPreferredInPersonMeetingLocation(e.target.value)
            }
          />
          <label for="in_person">In-Person</label>
          <br></br>
        </div>
        <button className="btn btn-success">Register Agent</button>
      </form>
    </Fragment>
  );
};

export default CreateAgent;

/** TODO:
 * create get request
 * render
 * - fix the radio button orientation
 * - realign the register button
 * - clear textboxes
 */
