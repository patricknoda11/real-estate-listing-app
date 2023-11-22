import React, { useState } from 'react';

const DeleteAgentTab = () => {
  const DELETE_REQUEST_ROUTE = 'http://localhost:5013/user/agents/';
  const [agentEmail, setAgentEmail] = useState('');
  const [password, setPassword] = useState('');

  const clearEntries = () => {
    setAgentEmail('');
    setPassword('');
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        agentEmail,
        password,
      };
      await fetch(DELETE_REQUEST_ROUTE, {
        method: 'DELETE',
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
      <h1>Delete Agent</h1>
      <div className="content">
        <form onSubmit={onSubmitForm}>
          <div className="form-group"></div>
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
          <button className="btn btn-primary">Delete</button>
        </form>
      </div>
    </div>
  );
};

export default DeleteAgentTab;
