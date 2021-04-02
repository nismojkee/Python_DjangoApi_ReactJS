import { Button, ButtonToolbar } from 'react-bootstrap';
import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import AddDepartment from './AddDepartment'
import EditDepartment from './EditDepartment';

export class Departments extends Component {
	constructor(props){
		super(props);
		this.state={
			deps: [],
			addModalShow: false,
			editModalShow: false,
		};
	};

	refreshList(){
		fetch(process.env.REACT_APP_API + 'department')
		.then(response => response.json())
		.then(data => {
			this.setState({deps: data});
		})
	};

	componentDidMount(){
		this.refreshList();
	};

	componentDidUpdate(){
		this.refreshList();
	};

	deleteDep(depid){
		if(window.confirm('Are you sure?')){
			fetch(process.env.REACT_APP_API + 'department/' + depid, {
				method: 'DELETE',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			})
		}
	};

	render() {
		const {deps, depid, depname} = this.state;
		let addModalClose = () => this.setState({addModalShow: false});
		let editModalClose = () => this.setState({editModalShow: false});

		return (
			<div>
				<Table striped bordored hover size="sm">
					<thead>
						<tr>
							<td>ID</td>
							<td>Department name</td>
							<td colSpan="2">Options</td>
						</tr>
					</thead>
					<tbody>
						{deps.length === 0 ?
						(`Here is empty. Add new department using button below`) :
						deps.map(dep => 
							<tr key={dep.DepartmentId}>
								<td>{dep.DepartmentId}</td>
								<td>{dep.DepartmentName}</td>
								<td>
									<ButtonToolbar>
										<Button className="text-uppercase" size="sm" variant="outline-warning" onClick={() => this.setState({editModalShow: true, depid: dep.DepartmentId, depname: dep.DepartmentName})}>Edit</Button>

										<EditDepartment show={this.state.editModalShow} onHide={editModalClose} depid={depid} depname={depname}/>
									</ButtonToolbar>
								</td>
								<td>
									<ButtonToolbar>
										<Button className="text-uppercase" size="sm" variant="outline-danger" onClick={() => this.deleteDep(dep.DepartmentId)}>Delete</Button>
									</ButtonToolbar>
								</td>
							</tr>
						)}
					</tbody>
				</Table>

				<ButtonToolbar>
					<Button variant="outline-dark" onClick={() => this.setState({addModalShow: true})}>New department</Button>

					<AddDepartment show={this.state.addModalShow} onHide={addModalClose} />
				</ButtonToolbar>
			</div>
		)
	}
}

export default Departments
