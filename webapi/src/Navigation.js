import React, { Component } from 'react'
import { Nav, Navbar } from 'react-bootstrap'

export class Navigation extends Component {
	render() {
		return (
			<Navbar bg="dark" variant="dark" expand="lg">
				<Navbar.Toggle aira-controls="navbar-nav" />
				<Navbar.Collapse id="navbar-nav">
					<Nav>
						<Nav.Link className="d-inline px-2 text-white" href="/">Departments</Nav.Link>
						<Nav.Link className="d-inline px-2 text-white" href="/employee">Employees</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}

export default Navigation
