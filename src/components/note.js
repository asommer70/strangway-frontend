import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import DeleteNote from '../queries/delete_note';
import Viewer from './viewer';

class Note extends Component {
	constructor(props) {
		super(props);

		this.state = {
			content: (this.props.note ? this.props.note.content : ""),
			edit: false,
		}
	}

	componentWillReceiveProps(props) {
		console.log('componentWillReceiveProps props:', props);
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
		this.setState({content: e.target.value});
	}

	saveNote(e) {
		// const note = this.props.note;
		// note.content = this.state.content;
		// console.log('note:', note);

		this.props.updateNote(this.props.note, this.state.content);
		this.setState({edit: !this.state.edit});
	}

	deleteNote(noteId) {
		this.props.mutate({variables: {id: noteId}})
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
		if (this.state.edit) {
			content = (
				<div className="row">
					<div className="columns small-6">
						<textarea value={this.state.content} onChange={this.handleChange.bind(this)} />
						<button className="button small" onClick={this.saveNote.bind(this)}>Save Note</button>
						<button
							className="button tiny float-right alert"
							onClick={() => this.deleteNote(this.props.note.id)}>&#215;</button>
					</div>

					<div className="columns small-6">
						<Viewer content={this.state.content} />
					</div>
				</div>
			);
		} else {
			content = <Viewer content={this.state.content} />;
		}

		return (
			<div>
        <h2>{this.props.note.name}</h2>
        <hr/>
        <br/>

        <div className="row">
					<div className="columns small-12">
						<button
							className="button tiny secondary float-right task-edit"
							onClick={() => this.setState({edit: !this.state.edit})}>Edit</button>

						<br/>

						{content}
					</div>
        </div>
			</div>
		);
	}
}


export default graphql(DeleteNote)(Note);
