import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import FolderQuery from '../queries/get_folder';
import Note from './note';
import NoteForm from './note_form';

class Notes extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(props) {
    this.setState({
      notes: props.data.folder.notes,
      selectedNote: props.data.folder.notes[0] || {}
    });
  }

  selectNote(idx) {
    this.setState({selectedNote: this.state.notes[idx]});
  }

  updateNote(note, content) {
    console.log('updateNote note:', note, 'content:', content);
    console.log('this.props:', this.props);
    this.props.mutate({
      variables: {
        id: this.state.selectedNote.id,
        name: this.state.selectedNote.name,
        content: content,
        folderId: this.state.selectedNote.folderId
      }
    })
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading Notes...</div>;
    }

    let note;
    if (this.props.newNote) {
      note = (
        note = <NoteForm createNote={this.props.createNote} folderId={this.props.folder.id} />
      );
    } else {
      note = <Note note={this.state.selectedNote} updateNote={this.updateNote.bind(this)}   />
    }

    return (
      <div className="row">
        <div className="columns small-2">
          <div className="notes-list">
            {
              this.state.notes.map((note, idx) => {
                return (
                  <div key={note.id} className="card note-card">
                    <div className="card-divider note-title text-center" onClick={() => this.selectNote(idx)}>
                      <strong>{note.name}</strong>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>

        <div className="columns small-10">
          {note}
        </div>
      </div>
    )
  }
}

export default graphql(FolderQuery, {
  options: (props) => { return { variables: { id: props.folder.id } } }
})(Notes);
