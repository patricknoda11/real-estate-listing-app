import './NavigationBar.scss';
import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Logo from '../../assets/logo.png';

const NavigationBar = () => {
	return (
		<Navbar bg="dark" variant="dark" className="navbar">
			<Navbar.Brand href="/">
				<img src={Logo} className="logo" />
			</Navbar.Brand>
			<Nav className="links">
				<Nav.Link href="/" className="link">
					Home
				</Nav.Link>
				<Nav.Link href="/about" className="link">
					About
				</Nav.Link>
				<NavDropdown title="Listings" className="link">
					<NavDropdown.Item href="/listings">search</NavDropdown.Item>
					<NavDropdown.Item href="/new-listing">add</NavDropdown.Item>
				</NavDropdown>
				<Nav.Link href="/listings/analytics" className="link">
					Listing-Analytics
				</Nav.Link>
				<Nav.Link href="/user/agents/analytics" className="link">
					Agent-Analytics
				</Nav.Link>
				<NavDropdown title="User" className="link">
					<NavDropdown.Item href="/user/agents">
						Agent
					</NavDropdown.Item>
				</NavDropdown>
			</Nav>
		</Navbar>
	);
};

export default NavigationBar;
