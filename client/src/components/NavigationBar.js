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
        <Nav.Link href="/" className="link">
          Home
        </Nav.Link>
        <Nav.Link href="/about" className="link">
          About
        </Nav.Link>
        <Nav.Link href="/listings" className="link">
          Listings
        </Nav.Link>
        <Nav.Link href="/listings/analytics" className="link">
          Listing Analytics
        </Nav.Link>
        <Nav.Link href="/user/agents/analytics" className="link">
          Agent Info
        </Nav.Link>
        <NavDropdown title="User" className="link dropdown">
          <NavDropdown.Item href="/user/owner">Owner</NavDropdown.Item>
          <NavDropdown.Item href="/user/agents">Agent</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
