import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddDepModal } from './AddDepModal';
import { EditDepModal } from './EditDepModal';

export class Department extends Component {
	constructor(props) {
		super(props);
		this.state = { deps: [], addModalShow: false, editModalShow: false };
	}
	refreshList() {
		fetch(process.env.REACT_APP_API + 'departments')
			.then(response => response.json())
			.then(data => {
				this.setState({ deps: data });
			});
	}

	componentDidMount() {
		this.refreshList();
	}

	componentDidUpdate() {
		this.refreshList();
	}

	deleteDepartment(depId) {
		if (window.confirm('Are you sure?')) {
			fetch(process.env.REACT_APP_API + `departments/${depId}`, {
				method: 'DELETE',
			}).then(() => this.setState({ status: 'Delete successful' }));
		}
	}

	render() {
		const { deps, depId, depName } = this.state;
		let addModalClose = () => this.setState({ addModalShow: false });
		let editModalClose = () => this.setState({ editModalShow: false });
		return (
			<div>
				<Table className='mt-4' striped bordered hover size='sm'>
					<thead>
						<tr>
							<th>DepartmentId</th>
							<th>DepartmentName</th>
							<th>Options</th>
						</tr>
					</thead>
					<tbody>
						{deps.map(dep => (
							<tr key={dep.id}>
								<td>{dep.id}</td>
								<td>{dep.departmentName}</td>
								<td>
									<ButtonToolbar>
										{/* Edit button. */}
										<Button
											className='mr-2'
											variant='info'
											onClick={() =>
												this.setState({
													editModalShow: true,
													depId: dep.id,
													depName: dep.departmentName,
												})
											}
										>
											Edit
										</Button>
										{/* Delete button. */}
										<Button
											className='mr-2'
											variant='danger'
											onClick={() => this.deleteDepartment(dep.id)}
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
				<AddDepModal show={this.state.addModalShow} onHide={addModalClose} />
				<EditDepModal
					show={this.state.editModalShow}
					onHide={editModalClose}
					depId={depId}
					depName={depName}
				/>
			</div>
		);
	}
}
export default Department;
