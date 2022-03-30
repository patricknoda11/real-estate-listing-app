import "./styles/NavigationBar.scss";
import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" className="navbar">
      <Navbar.Brand href="/">
        <img src={require("../assets/logo.png")} className="logo" />
      </Navbar.Brand>

      <Nav className="links">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/about">About</Nav.Link>
        <Nav.Link href="/listings">Listings</Nav.Link>
        <Nav.Link href="/listings/analytics">Listing Analytics</Nav.Link>
        <Nav.Link href="/user/agents/analytics">Agent Info</Nav.Link>
        <NavDropdown title="User">
          <NavDropdown.Item href="/user/owner">Owner</NavDropdown.Item>
          <NavDropdown.Item href="/user/agents">Agent</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
