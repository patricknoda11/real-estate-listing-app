import React, { useState } from 'react';
import * as ReactBootStrap from 'react-bootstrap';

import './AgentAnalytics.scss';

const AgentAnalytics = () => {
  const [count, setCount] = useState('');
  const [entries, setEntries] = useState([]);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { count };
      const response = await fetch(
        'http://localhost:5013/user/agents/analytics',
        {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );
      const parsedResponse = await response.json();
      setEntries(parsedResponse);
      setCount('');
    } catch (error) {
      alert(error.message);
      setCount('');
    }
  };

  return (
    <div className="flex-container-agent-analytics">
      <h1>Agent Listing Analytics</h1>
      <div className="content">
        <form onSubmit={onSubmitForm}>
          <label>Minimum Listings Agent Must Have</label>
          <input
            className="mx-3"
            type="number"
            placeholder="e.g. 2"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            required
          />
          <button className="btn btn-success my-3">Get</button>
        </form>
        <ReactBootStrap.Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone #</th>
              <th>Number of Listings</th>
              <th>Highest Priced Listing</th>
              <th>lowest Priced Listing</th>
              <th>Average Listing Price</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, i) => (
              <tr key={i}>
                <td>{entry?.name}</td>
                <td>{entry?.agentEmail}</td>
                <td>{entry?.phoneNumber}</td>
                <td>{entry?.cnt}</td>
                <td>{entry?.max}</td>
                <td>{entry?.min}</td>
                <td>{entry?.avg}</td>
              </tr>
            ))}
          </tbody>
        </ReactBootStrap.Table>
      </div>
    </div>
  );
};

export default AgentAnalytics;
