import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';

// Import Styles:
import './NavigationBar.scss';

// Other Imports:
import Logo from '../../assets/logo.png';

const NavigationBar = () => {
  const location = useLocation();

  const isDropdownActive = (paths) => {
    console.log('line14', paths);
    console.log('line15', location.pathname);
    return paths.includes(location.pathname);
  };
  return (
    <Navbar bg="dark" variant="dark" className="navbar">
      <Navbar.Brand href="/">
        <img src={Logo} alt="logo" className="logo" />
      </Navbar.Brand>
      <Nav className="links">
        <Nav.Item>
          <NavLink to="/" exact className="nav-link" activeClassName="active">
            Home
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/about" className="nav-link" activeClassName="active">
            About
          </NavLink>
        </Nav.Item>
        <NavDropdown
          title="Listings"
          className={`nav-link ${
            isDropdownActive(['/listings', '/new-listing'])
              ? 'active-dropdown'
              : ''
          }`}
        >
          <NavDropdown.Item as={NavLink} to="/listings">
            search
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/new-listing">
            add
          </NavDropdown.Item>
        </NavDropdown>
        <Nav.Item>
          <NavLink
            to="/listings/analytics"
            className="nav-link"
            activeClassName="active"
          >
            Listing-Analytics
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink
            to="/user/agents/analytics"
            className="nav-link"
            activeClassName="active"
          >
            Agent-Analytics
          </NavLink>
        </Nav.Item>
        <NavDropdown title="User" className="nav-link">
          <NavDropdown.Item as={NavLink} to="/user/agents">
            Agent
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
