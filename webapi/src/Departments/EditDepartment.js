import React, { Component } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'

export class EditDepartment extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	};

	handleSubmit = e => {
		e.preventDefault();
		fetch(process.env.REACT_APP_API + 'department', {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				DepartmentId: e.target.DepartmentId.value,
				DepartmentName: e.target.DepartmentName.value
			})
		})
			.then(res => res.json())
			.then(
				(result) => alert(result),
				(error) => alert('Failed to Update'),
			)
	}

	render() {
		return (
			<Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Update department
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row>
						<Col>
							<Form onSubmit={this.handleSubmit}>
								<Form.Group controlId="DepartmentId">
									<Form.Label>Department Id</Form.Label>
									<Form.Control type="text" name="DepartmentId" required defaultValue={this.props.depid} />
								</Form.Group>

								<Form.Group controlId="DepartmentName">
									<Form.Label>Department Name</Form.Label>
									<Form.Control type="text" name="DepartmentName" required defaultValue={this.props.depname} />
								</Form.Group>

								<Form.Group>
									<Button variant="success" type="submit">
										Update department
									</Button>
								</Form.Group>
							</Form>
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

export default EditDepartment
