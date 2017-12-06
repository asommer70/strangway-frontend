import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import UpdateNote from '../queries/update_note';
import DeleteNote from '../queries/delete_note';
import Viewer from './viewer';

class Note extends Component {
	constructor(props) {
		super(props);

		const failedUpdate = JSON.parse(localStorage.getItem('failedUpdate'));

		if (this.props.note) {
			this.state = {
				name: this.props.note.name,
				content: this.props.note.content,
				folderId: this.props.note.folderId,
				edit: false,
			}
		} else if (failedUpdate) {
			this.state = {
				name: failedUpdate.name,
				content: failedUpdate.content,
				folderId: failedUpdate.folderId,
				edit: true,
			}
		} else {
			this.state = {
				name: '',
				content: '',
				folderId: '',
				edit: false,
			}
		}
	}

	componentWillReceiveProps(props) {
		if (props.note) {
			this.setState({content: props.note.content, name: props.note.name, folderId: props.note.folderId});
		}
	}

	componentDidMount() {
		// Add an event noteener to the document to noteen for the change event outside of React.
		document.addEventListener('change', (e) => {
			if (e.target.classList.contains('task-list-item-checkbox')) {
				// Get the text for the task and if it's checked or not.
				const taskText = e.target.nextSibling.innerHTML;
				const taskStatus = e.target.checked;
				this.updateCheckbox(taskText, taskStatus);
			}
		});

		// Setup some shortcut keys.
		window.onkeydown = (e) => {
			// Change to edit mode with Command+e.
			if (e.metaKey && e.keyCode == 69) {
				e.preventDefault();
				this.setState({edit: !this.state.edit});
			}

			// Save Note with Command+s.
			if (e.metaKey && e.keyCode == 83) {
				e.preventDefault();
				this.saveNote(null, true);
				this.setState({edit: !this.state.edit});
			}
		}
	}

	updateCheckbox(text, status) {
		let contents = this.state.content.split("\n");
		contents = contents.map((content) => {
			if (content.substr(5) == text) {
				if (status) {
					content = '* [x]' + content.substr(5);
				} else {
					content = '* [ ]' + content.substr(5);
				}
			}
			return content;
		});

		this.setState({content: contents.join("\n")}, () => {
			this.saveNote(null, true);
		});
	}

	setHeight(c) {
		if (c === null) {
			return;
		}
		c.setAttribute('style', 'height: ' + c.scrollHeight + 'px;');
	}

	handleChange(e) {
		const newState = {};
		const elName = e.target.getAttribute('name');

		// Update Note right away if changing folders.
		if (elName == 'folderId') {
			newState[elName] = e.target.value;
			newState.oldFolderId = this.props.note.folderId;
			this.setState(newState, () => {return null;});
		} else {
			newState[elName] = e.target.value;
			this.setState(newState);
		}
	}

	saveNote(e, edit) {
		this.props.UpdateNote({
			variables: {
				id: this.props.note.id,
				name: this.state.name,
				content: this.state.content,
				folderId: this.state.folderId
			}
		}).then((res) => {
			if (!res.data.editNote) {
				const failedUpdate = {
					id: this.props.note.id,
					name: this.state.name,
					content: this.state.content,
					folderId: this.state.folderId
				}
				localStorage.setItem('failedUpdate', JSON.stringify(failedUpdate));
				this.props.history.push('/login', [{err: {message: 'Note not updated.'}}]);
			} else {
				localStorage.removeItem('failedUpdate');
			}

			if (this.state.oldFolderId) {
				this.props.getFolder(this.state.folderId);

				this.props.folders.forEach((folder, idx) => {
					if (this.state.folderId == folder.id) {
						this.props.selectFolder(idx)
					}
				});
			}
		});

		if (!edit) {
			this.setState({edit: !this.state.edit});
		}
	}

	deleteNote(noteId) {
		if (window.confirm(`Delete ${this.state.name}?`)) {
			this.props.DeleteNote({variables: {id: noteId}})
				.then(() => {
					this.props.getFolder(this.props.note.folderId);
				});
			this.setState({edit: !this.state.edit});
		}
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
						<textarea
							ref={(c) => this.setHeight(c)} value={this.state.content}
							onChange={this.handleChange.bind(this)}
							name="content" />

						<label htmlFor="folderId">Folder</label>
						<select name="folderId" id="folderId" value={this.state.folderId} onChange={this.handleChange.bind(this)}>
							{
								this.props.folders.map((folder) => {
									return <option key={folder.id} value={folder.id}>{folder.name}</option>
								})
							}
						</select>

						<br/>
						<button className="button small icon-button" onClick={this.saveNote.bind(this)}>&#10003;</button>
						<button
							className="button tiny float-right alert icon-button"
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
			name = (
				<div>
					<h2 className="note-title">{this.props.note.name}</h2>
					<div className="note-updatedat float-right">{this.props.note.updatedAt}</div>
				</div>
			);
		}

		return (
			<div>
				{name}
        <hr/>
        <br/>

        <div className="row">
					<div className="columns small-12">
						<button
							className="button tiny secondary float-right note-edit icon-button"
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
