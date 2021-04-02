import React, { Component } from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';

export class Employees extends Component {
	constructor(props) {
		super(props);
		this.state = {
			emps: [],
			addModalShow: false,
			editModalShow: false,
		};
	};

	refreshList() {
		fetch(process.env.REACT_APP_API + 'employee')
			.then(response => response.json())
			.then(data => {
				this.setState({ emps: data });
			})
	};

	componentDidMount() {
		this.refreshList();
	};

	componentDidUpdate() {
		this.refreshList();
	};

	deleteEmp(empid) {
		if (window.confirm('Are you sure?')) {
			fetch(process.env.REACT_APP_API + 'employee/' + empid, {
				method: 'DELETE',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			})
		}
	};

	render() {
		const { emps, empid, empname, depmt, photofile, doj } = this.state;
		let addModalClose = () => this.setState({ addModalShow: false });
		let editModalClose = () => this.setState({ editModalShow: false });

		return (
			<div>
				<Table striped bordored hover size="sm">
					<thead>
						<tr>
							<td>ID</td>
							<td>Employee name</td>
							<td>Department</td>
							<td>Date of Joining</td>
							<td colSpan="2">Options</td>
						</tr>
					</thead>
					<tbody>
						{emps.length === 0 ?
							(`Here is empty. Add new employee using button below`) :
							emps.map(emp =>
								<tr key={emp.EmployeeId}>
									<td>{emp.EmployeeId}</td>
									<td>{emp.EmployeeName}</td>
									<td>{emp.Department}</td>
									<td>{emp.DateOfJoining}</td>
									<td>
										<ButtonToolbar>
											<Button className="text-uppercase" size="sm" variant="outline-warning" onClick={() => this.setState(
												{ editModalShow: true, empid: emp.EmployeeId, empname: emp.EmployeeName, depmt: emp.Department, photofile: emp.PhotoFileName, doj: emp.DateOfJoining }
											)}>Edit</Button>

											<EditEmployee
												show={this.state.editModalShow}
												onHide={editModalClose}
												empid={empid}
												empname={empname}
												depmt={depmt}
												photofile={photofile}
												doj={doj}
											/>
										</ButtonToolbar>
									</td>
									<td>
										<ButtonToolbar>
											<Button className="text-uppercase" size="sm" variant="outline-danger" onClick={() => this.deleteEmp(emp.EmployeeId)}>Delete</Button>
										</ButtonToolbar>
									</td>
								</tr>
							)}
					</tbody>
				</Table>

				<ButtonToolbar>
					<Button variant="outline-dark" onClick={() => this.setState({ addModalShow: true })}>New Employee</Button>

					<AddEmployee show={this.state.addModalShow} onHide={addModalClose} />
				</ButtonToolbar>
			</div>
		)
	}
}

export default Employees
