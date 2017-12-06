import React, { Component } from 'react';
import Viewer from './viewer';

export default class NoteForm extends Component {
  constructor(props) {
    super(props);

    const failedNote = JSON.parse(localStorage.getItem('failedNote'));

    this.state = {
      name: (failedNote ? failedNote.name : ''),
      content: (failedNote ? failedNote.content: '#')
    }
  }

  createNote(e) {
    e.preventDefault();
    const newNote = {
      name: this.state.name,
      content: this.state.content,
      folderId: this.props.folderId
    }

    this.props.createNote(newNote);
  }

  handleChange(e) {
		const newState = {};
		const elName = e.target.getAttribute('name');

		newState[elName] = e.target.value;
		this.setState(newState);
	}

  render() {
    return (
      <div className="row">
        <div className="columns small-6">
          <h5>New Note</h5>
          <form onSubmit={this.createNote.bind(this)}>
            <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange.bind(this)} />
            <br/>
            <textarea name="content" id="content" placeholder="Content" value={this.state.content} onChange={this.handleChange.bind(this)}></textarea>
            <br/>
            <button type="submit" className="button small success icon-button">&#10003;</button>
          </form>
        </div>

        <div className="columns small-6">
          <Viewer content={this.state.content} />
        </div>
      </div>
    )
  }
}
