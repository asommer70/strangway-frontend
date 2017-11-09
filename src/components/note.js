import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import UpdateNote from '../queries/update_note';
import DeleteNote from '../queries/delete_note';
import Viewer from './viewer';

class Note extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: (this.props.note ? this.props.note.name : ''),
			content: (this.props.note ? this.props.note.content : ''),
			edit: false,
		}
	}

	componentWillReceiveProps(props) {
		this.setState({content: props.note.content});
	}

	componentDidMount() {
		// Add an event noteener to the document to noteen for the change event outside of React.
		document.addEventListener('change', (e) => {
			if (e.target.classNote.contains('task-note-item-checkbox')) {
				// Get the text for the task and if it's checked or not.
				const taskText = e.target.nextSibling.innerHTML;
				const taskStatus = e.target.checked;
				this.props.taskStatusChange(taskText, taskStatus);
			}
		});
	}

	handleChange(e) {
		const newState = {};
		newState[e.target.getAttribute('name')] = e.target.value;
		this.setState(newState);
	}

	saveNote(e) {
		this.props.UpdateNote({
			variables: {
				id: this.props.note.id,
				name: this.state.name,
				content: this.state.content,
				folderId: this.props.note.folderId
			}
		})
		this.setState({edit: !this.state.edit});
	}

	deleteNote(noteId) {
		this.props.DeleteNote({variables: {id: noteId}})
			.then(() => {
				this.props.getFolder(this.props.note.folderId);
			});
		this.setState({edit: !this.state.edit});
	}

	render() {
		if (!this.props.note) {
			return <h2>No note selected...</h2>;
		}

		let content;
		let name;
		if (this.state.edit) {
			content = (
				<div className="row">
					<div className="columns small-6">
						<textarea value={this.state.content} onChange={this.handleChange.bind(this)} name="content" />
						<button className="button small" onClick={this.saveNote.bind(this)}>&#10003;</button>
						<button
							className="button tiny float-right alert"
							onClick={() => this.deleteNote(this.props.note.id)}>&#10007;</button>
					</div>

					<div className="columns small-6">
						<Viewer content={this.state.content} />
					</div>
				</div>
			);

			name = <input type="text" name="name" onChange={this.handleChange.bind(this)} value={this.state.name} />
		} else {
			content = <Viewer content={this.state.content} />;
			name = <h2>{this.props.note.name}</h2>;
		}

		return (
			<div>
				{name}
        <hr/>
        <br/>

        <div className="row">
					<div className="columns small-12">
						<button
							className="button tiny secondary float-right task-edit"
							onClick={() => this.setState({edit: !this.state.edit})}>&#8496;</button>

						<br/>

						{content}
					</div>
        </div>
			</div>
		);
	}
}

export default graphql(DeleteNote, {name: 'DeleteNote'})(graphql(UpdateNote, {name: 'UpdateNote'})(Note));
