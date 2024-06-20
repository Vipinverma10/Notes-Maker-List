import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Container, Row, Col, Button, InputGroup, FormControl, ListGroup } from 'react-bootstrap';

class App extends Component {
	constructor(props) {
		super(props);

		// Setting up state
		this.state = {
			userInput: "",
			list: [],
		};
	}

	// Set a user input value
	updateInput(value) {
		this.setState({
			userInput: value,
		});
	}

	// Add item if user input is not empty
	addItem() {
		if (this.state.userInput !== "") {
			const userInput = {
				// Add a random id which is used to delete
				id: Math.random(),

				// Add a user value to list
				value: this.state.userInput,
			};

			// Update list
			const list = [...this.state.list];
			list.push(userInput);

			// Reset state
			this.setState({
				list,
				userInput: "",
			});
		}
	}

	// Function to delete item from list using id
	deleteItem(key) {
		const list = [...this.state.list];

		// Filter values and leave value which we need to delete
		const updateList = list.filter((item) => item.id !== key);

		// Update list in state
		this.setState({
			list: updateList,
		});
	}

	editItem = (index) => {
		const todos = [...this.state.list];
		const editedTodo = prompt('Edit the todo:');
		if (editedTodo !== null && editedTodo.trim() !== '') {
			let updatedTodos = [...todos];
			updatedTodos[index].value = editedTodo;
			this.setState({
				list: updatedTodos,
			});
		}
	}

	render() {
		return (
			<Container className="container">
				<Row className="title">
					TODO LIST
				</Row>

				<hr />
				<Row>
					<Col md={{ span: 5, offset: 4 }}>
						<InputGroup className="input-group-container">
							<FormControl
								placeholder="add item . . ."
								size="lg"
								value={this.state.userInput}
								onChange={(item) => this.updateInput(item.target.value)}
								aria-label="add something"
								aria-describedby="basic-addon2"
							/>
							<InputGroup>
								<Button
									variant="dark"
									className="add-button"
									onClick={() => this.addItem()}
								>
									ADD
								</Button>
							</InputGroup>
						</InputGroup>
					</Col>
				</Row>
				<Row>
					<Col md={{ span: 5, offset: 4 }}>
						<ListGroup className="list-group-container">
							{/* Map over and print items */}
							{this.state.list.map((item, index) => {
								return (
									<div key={index}>
										<ListGroup.Item
											variant="dark"
											action
											className="list-group-item"
										>
											{item.value}
											<span>
												<Button
													className="button-margin"
													variant="light"
													onClick={() => this.deleteItem(item.id)}
												>
													Delete
												</Button>
												<Button variant="light" onClick={() => this.editItem(index)}>
													Edit
												</Button>
											</span>
										</ListGroup.Item>
									</div>
								);
							})}
						</ListGroup>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default App;
