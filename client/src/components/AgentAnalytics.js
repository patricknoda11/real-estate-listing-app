import "./styles/AgentAnalytics.scss";
import { useState } from "react";
import * as ReactBootStrap from "react-bootstrap";

const AgentAnalytics = () => {
  const [count, setCount] = useState("");
  const [entries, setEntries] = useState([]);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { count };
      const response = await fetch(
        "http://localhost:5013/user/agents/analytics",
        {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const parsedResponse = await response.json();
      console.log(parsedResponse);
      setEntries(parsedResponse);
      setCount("");
    } catch (error) {
      alert(error.message);
      setCount("");
    }
  };
  return (
    <div className="flex-container-agent-analytics">
      <h1>Highest Priced Listings For Each Agent</h1>
      <div className="content">
        <form onSubmit={onSubmitForm}>
          <label>Listing Count</label>
          <input
            className="mx-3"
            type="number"
            placeholder="e.g. 2"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
          <button className="btn btn-primary my-3">Get</button>
        </form>
        <ReactBootStrap.Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone #</th>
              <th>Highest Priced Listing</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, i) => (
              <tr key={i}>
                <td>{entry.name}</td>
                <td>{entry.agentEmail}</td>
                <td>{entry.phoneNumber}</td>
                <td>{entry["Max(price)"]}</td>
              </tr>
            ))}
          </tbody>
        </ReactBootStrap.Table>
      </div>
    </div>
  );
};

export default AgentAnalytics;
