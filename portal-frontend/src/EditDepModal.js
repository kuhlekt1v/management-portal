import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class EditDepModal extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
	}

	handleCloseModal() {
		this.setState({ showModal: false });
	}

	handleSubmit(event) {
		event.preventDefault();
		const depId = event.target.departmentId.value;
		const request = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				id: depId,
				departmentName: event.target.departmentName.value,
			}),
		};
		fetch(process.env.REACT_APP_API + `departments/${depId}`, request)
			.then(async response => {
				const isJson = response.headers
					.get('content-type')
					?.includes('application/json');
				const data = isJson && (await response.json());

				// Check for error response.
				if (!response.ok) {
					// get error message from body or default to response status
					const error = (data && data.message) || response.status;
					return Promise.reject(error);
				}
			})

			.catch(error => {
				this.setState({ errorMessage: error.toString() });
				alert('Something went wrong! See console for details.');
				console.error('There was an error!', error);
			});
	}

	render() {
		return (
			<div className='container'>
				<Modal
					{...this.props}
					size='lg'
					aria-labelledby='contained-modal-title-vcenter'
					centered
					ref={this.myRef}
				>
					<Modal.Header closeButton>
						<Modal.Title id='contained-modal-title-vcenter'>
							Edit Department
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Row>
							<Col sm={6}>
								<Form onSubmit={this.handleSubmit}>
									<Form.Group controlId='departmentId'>
										<Form.Label>Department ID</Form.Label>
										<Form.Control
											type='text'
											name='departmentId'
											disabled
											defaultValue={this.props.depId}
											placeholder='Department ID'
										></Form.Control>
									</Form.Group>
									<Form.Group controlId='departmentName'>
										<Form.Label>Department Name</Form.Label>
										<Form.Control
											type='text'
											name='departmentName'
											required
											defaultValue={this.props.depName}
											placeholder='Department Name'
										></Form.Control>
									</Form.Group>
									<Form.Group>
										<Button variant='primary' type='submit'>
											Update Department
										</Button>
									</Form.Group>
								</Form>
							</Col>
						</Row>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='danger' onClick={this.props.onHide}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}
