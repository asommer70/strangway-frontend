import React, { Component } from 'react';
import Viewer from './viewer';

export default class Note extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tasks: (this.props.note ? this.props.note.tasks : ""),
			edit: false,
		}
	}

	componentWillReceiveProps(props) {
		this.setState({tasks: props.note.tasks});
	}

	componentDidMount() {
		// Add an event noteener to the document to noteen for the change event outside of React.
		document.addEventNoteener('change', (e) => {
			if (e.target.classNote.contains('task-note-item-checkbox')) {
				// Get the text for the task and if it's checked or not.
				const taskText = e.target.nextSibling.innerHTML;
				const taskStatus = e.target.checked;
				this.props.taskStatusChange(taskText, taskStatus);
			}
		});
	}

	handleChange(e) {
		this.setState({tasks: e.target.value});
	}

	saveTasks(e) {
		this.props.updateTask(this.state.tasks);
		this.setState({edit: !this.state.edit});
	}

	render() {
		if (!this.props.note) {
			return <h2>No note selected...</h2>;
		}

		let tasks;
		if (this.state.edit) {
			tasks = (
				<div className="row">
					<div className="columns small-6">
						<textarea value={this.state.tasks} onKeyup={this.handleChange.bind(this)} />
						<button className="button small" onClick={this.saveTasks.bind(this)}>Save Tasks</button>
					</div>

					<div className="columns small-6">
						<Viewer content={this.state.tasks} />
					</div>
				</div>
			);
		} else {
			tasks = <Viewer content={this.state.tasks} />;
		}

		return (
			<div>
        <h2>{this.props.note.name}</h2>
        <hr/>
        <br/>

        <div className="row">
					<div className="columns small-12">
						<h3 className="tasks-label">Tasks</h3>
						<button className="button tiny secondary float-right task-edit" onClick={() => this.setState({edit: !this.state.edit})}>Edit</button>
						<br/>

						{tasks}
					</div>
        </div>
			</div>
		);
	}
}
