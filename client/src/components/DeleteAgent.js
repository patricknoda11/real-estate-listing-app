import React, { Fragment, useState } from "react";

const DeleteAgent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5013/user/agent/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      clearEntries();
    } catch (error) {}
  };

  const clearEntries = () => {
    setPassword("");
    setEmail("");
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Delete Agent</h1>
      <form onSubmit={onSubmitForm}>
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
        <button className="btn btn-danger">Delete Agent</button>
      </form>
    </Fragment>
  );
};

export default DeleteAgent;
