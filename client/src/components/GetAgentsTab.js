import React, { useState } from "react";
import * as ReactBootStrap from "react-bootstrap";

const GetAgentsTab = () => {
  const [entries, setEntries] = useState([]);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(" http://localhost:5013/user/agents/");
      const parsedResponse = await response.json();
      setEntries(parsedResponse);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex-container-agent">
      <h1>Retrieve Agent Information</h1>
      <div className="content">
        <form onSubmit={onSubmitForm}>
          <button className="btn btn-success my-3">Get</button>
        </form>
        <ReactBootStrap.Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone #</th>
              <th>Meeting Duration</th>
              <th>Meeting Location</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr>
                <td>{entry.name}</td>
                <td>{entry.agentEmail}</td>
                <td>{entry.phoneNumber}</td>
                <td>{entry.preferredMeetingDuration}</td>
                <td>{entry.preferredInPersonMeetingLocation}</td>
              </tr>
            ))}
          </tbody>
        </ReactBootStrap.Table>
      </div>
    </div>
  );
};

export default GetAgentsTab;
