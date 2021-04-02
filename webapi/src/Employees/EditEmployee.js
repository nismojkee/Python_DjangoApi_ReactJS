import React, { Component } from 'react'
import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap'

export class EditEmployee extends Component {
	constructor(props) {
		super(props);
		this.state = { deps: [] };
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFileSelected = this.handleFileSelected.bind(this);
	};

	photofile = "anonymous.png"
	imagesrc = process.env.REACT_APP_PHOTOPATH + this.photofile;

	componentDidMount() {
		fetch(process.env.REACT_APP_API + 'department')
			.then(response => response.json())
			.then(data => {
				this.setState({ deps: data })
			})
	};

	handleSubmit = e => {
		e.preventDefault();
		fetch(process.env.REACT_APP_API + 'employee', {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				EmployeeId: e.target.EmployeeId.value,
				EmployeeName: e.target.EmployeeName.value,
				Department: e.target.Department.value,
				DateOfJoining: e.target.DateOfJoining.value,
				PhotoFileName: this.photofile,
			})
		})
			.then(res => res.json())
			.then(
				(result) => alert(result),
				(error) => alert('Failed to Add'),
			)
	};

	handleFileSelected = e => {
		e.preventDefault();
		this.photofile = e.target.files[0].name;
		const formData = new FormData();
		formData.append(
			"uploadedFile",
			e.target.files[0],
			e.target.files[0].name
		);

		fetch(process.env.REACT_APP_API + 'employee/savefile', {
			method: 'POST',
			body: formData
		}).then(res => res.json())
			.then(
				(result) => { this.imagesrc = process.env.REACT_APP_PHOTOPATH + result },
				(error) => alert('Failed to Upload')
			)
	};

	render() {
		return (
			<Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Edit employee
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row>
						<Col sm={6}>
							<Form onSubmit={this.handleSubmit}>
								<Form.Group controlId="EmployeeId">
									<Form.Label>Employee Id</Form.Label>
									<Form.Control type="text" name="EmployeeId" required defaultValue={this.props.empid} disabled />
								</Form.Group>

								<Form.Group controlId="EmployeeName">
									<Form.Label>Employee Name</Form.Label>
									<Form.Control type="text" name="EmployeeName" required defaultValue={this.props.empname} />
								</Form.Group>

								<Form.Group controlId="Department">
									<Form.Label>Department</Form.Label>
									<Form.Control as="select" required defaultValue={this.props.depmt}>
										{this.state.deps.map(dep =>
											<option key={dep.DepartmentId}>{dep.DepartmentName}</option>
										)}
									</Form.Control>
								</Form.Group>

								<Form.Group controlId="DateOfJoining">
									<Form.Label>Date of joining</Form.Label>
									<Form.Control type="date" name="DateOfJoining" defaultValue={this.props.doj} required />
								</Form.Group>

								<Form.Group>
									<Button variant="success" type="submit">
										Update employee
									</Button>
								</Form.Group>
							</Form>
						</Col>
						<Col sm={6}>
							<Image width="200px" height="200px" src={process.env.REACT_APP_PHOTOPATH + this.props.photofile} />
							<input onChange={this.handleFileSelected} type="file" />
						</Col>
					</Row>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={this.props.onHide}>Close</Button>
				</Modal.Footer>
			</Modal>
		)
	}
}

export default EditEmployee
