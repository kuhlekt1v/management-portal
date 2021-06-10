import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';

export class Employee extends Component {
	constructor(props) {
		super(props);
		this.state = { emps: [], addModalShow: false, editModalShow: false };
	}
	refreshList() {
		fetch(process.env.REACT_APP_API + 'employees')
			.then(response => response.json())
			.then(data => {
				this.setState({ emps: data });
			});
	}

	componentDidMount() {
		this.refreshList();
	}

	componentDidUpdate() {
		this.refreshList();
	}

	deleteEmployee(empId) {
		if (window.confirm('Are you sure?')) {
			fetch(process.env.REACT_APP_API + `employees/${empId}`, {
				method: 'DELETE',
			}).then(() => this.setState({ status: 'Delete successful' }));
		}
	}

	render() {
		const { emps, empId, empName, dateString, departmentName } = this.state;
		let addModalClose = () => this.setState({ addModalShow: false });
		let editModalClose = () => this.setState({ editModalShow: false });
		return (
			<div>
				<Table className='mt-4' striped bordered hover size='sm'>
					<thead>
						<tr>
							<th>EmployeeId</th>
							<th>Name</th>
							<th>Hire Date</th>
							<th>Department</th>
							<th>Options</th>
						</tr>
					</thead>
					<tbody>
						{emps.map(emp => (
							<tr key={emp.id}>
								<td>{emp.id}</td>
								<td>{emp.employeeName}</td>
								<td>{emp.dateString}</td>
								<td>{emp.departmentName}</td>
								<td>
									<ButtonToolbar>
										{/* Edit button. */}
										<Button
											className='mr-2'
											variant='info'
											onClick={() =>
												this.setState({
													editModalShow: true,
													empId: emp.id,
													empName: emp.employeeName,
													dateString: emp.dateString,
													departmentName: emp.departmentName,
												})
											}
										>
											Edit
										</Button>
										{/* Delete button. */}
										<Button
											className='mr-2'
											variant='danger'
											onClick={() => this.deleteEmployee(emp.id)}
										>
											Delete
										</Button>
									</ButtonToolbar>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
				<ButtonToolbar>
					<Button
						variant='primary'
						onClick={() => this.setState({ addModalShow: true })}
					>
						Add Department
					</Button>
				</ButtonToolbar>
				{/* <AddDepModal show={this.state.addModalShow} onHide={addModalClose} />
				<EditDepModal
					show={this.state.editModalShow}
					onHide={editModalClose}
					empId={empId}
					employeeName={employeeName}
					dateString={dateString}
					departmentName={departmentName}
				/> */}
			</div>
		);
	}
}
export default Employee;
