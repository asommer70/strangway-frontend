import React, { Component } from 'react';
import Viewer from './viewer';

export default class NoteForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      content: '#'
    }
  }

  createNote(e) {
    e.preventDefault();
    const newNote = {
      name: this.refs.name.value,
      content: this.state.content,
      folderId: this.props.folderId
    }

    this.props.createNote(newNote);
  }

  handleChange(e) {
    this.setState({content: e.target.value});
  }

  render() {
    return (
      <div className="row">
        <div className="columns small-6">
          <h5>New Note</h5>
          <form onSubmit={this.createNote.bind(this)}>
            <input type="text" name="name" ref="name" placeholder="Name" />
            <br/>
            <textarea name="content" id="content" placeholder="Content" onChange={this.handleChange.bind(this)}></textarea>
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
