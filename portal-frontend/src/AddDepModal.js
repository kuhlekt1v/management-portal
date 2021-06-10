import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class AddDepModal extends Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		const request = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				departmentName: event.target.departmentName.value,
			}),
		};
		fetch(process.env.REACT_APP_API + 'departments', request)
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
							Add Department
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Row>
							<Col sm={6}>
								<Form onSubmit={this.handleSubmit}>
									<Form.Group controlId='departmentName'>
										<Form.Label>Department Name</Form.Label>
										<Form.Control
											type='text'
											name='departmentName'
											required
											placeholder='Department Name'
										></Form.Control>
									</Form.Group>
									<Form.Group>
										<Button variant='primary' type='submit'>
											Add Department
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
