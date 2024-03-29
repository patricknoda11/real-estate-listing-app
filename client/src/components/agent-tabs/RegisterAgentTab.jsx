import React, { useState } from 'react';

const RegisterAgentTab = () => {
  const POST_REQUEST_ROUTE = 'http://localhost:5013/user/agents/';
  const [phoneNumber, setPhoneNumber] = useState('');
  const [agentEmail, setAgentEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [yearsExperience, setYearExperience] = useState('');
  const [preferredMeetingDuration, setPreferredMeetingDuration] = useState('');
  const [
    preferredInPersonMeetingLocation,
    setPreferredInPersonMeetingLocation,
  ] = useState('');

  const clearEntries = () => {
    setPhoneNumber('');
    setAgentEmail('');
    setPassword('');
    setName('');
    setBirthday('');
    setYearExperience('');
    setPreferredMeetingDuration('');
    setPreferredInPersonMeetingLocation('');
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        phoneNumber,
        agentEmail,
        password,
        name,
        birthday,
        yearsExperience,
        preferredMeetingDuration,
        preferredInPersonMeetingLocation,
      };
      await fetch(POST_REQUEST_ROUTE, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    } catch (error) {
      alert(error.message);
    } finally {
      clearEntries();
    }
  };

  return (
    <div className="flex-container-agent">
      <h1>Register Agent</h1>
      <div className="content">
        <form onSubmit={onSubmitForm}>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="number"
              placeholder="e.g. 6048301191"
              className="form-control"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="e.g. dakotajohnson@gmail.com"
              className="form-control"
              value={agentEmail}
              onChange={(e) => setAgentEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password </label>
            <input
              type="password"
              placeholder="e.g. *@#!"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="e.g. Dakota Johnson"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Birthday</label>
            <input
              type="date"
              placeholder="e.g. 2018-05-12"
              className="form-control"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Years of Experience</label>
            <input
              type="number"
              placeholder="e.g. 3"
              className="form-control"
              value={yearsExperience}
              onChange={(e) => setYearExperience(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Preferred Meeting Duration (min)</label>
            <input
              type="number"
              placeholder="e.g. 30"
              className="form-control"
              value={preferredMeetingDuration}
              onChange={(e) => setPreferredMeetingDuration(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Preferred Meeting location</label>
            <input
              type="text"
              placeholder="e.g. Vancouver, BC"
              className="form-control"
              value={preferredInPersonMeetingLocation}
              onChange={(e) =>
                setPreferredInPersonMeetingLocation(e.target.value)
              }
              required
            />
          </div>
          <button className="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterAgentTab;
