import React, { Component } from 'react';
import Viewer from './viewer';

export default class NoteForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      content: ''
    }
  }

  createNote(e) {
    e.preventDefault();
    console.log('this.refs:', this.refs);
    const newNote = {
      name: this.refs.name.value,
      content: this.refs.content.value,
      folderId: this.props.folderId
    }

    this.props.createNote(newNote);
  }

  render() {
    return (
      <div className="row">
        <div className="columns small-6">
          <form onSubmit={this.createNote.bind(this)}>
            <input type="text" name="name" ref="name" placeholder="Name" />
            <br/>
            <textarea name="content" ref="content" placeholder="Content"></textarea>
            <br/>
            <button type="submit" className="button small">Create Note</button>
          </form>
        </div>

        <div className="columns small-6">
          <Viewer content={this.state.content} />
        </div>
      </div>
    )
  }
}
