import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import FolderQuery from '../queries/get_folder';
import Note from './note';
import NoteForm from './note_form';

class Notes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIdx: 0
    }
  }

  componentWillReceiveProps(props) {
    this.getFolder(props.folder.id);

    let notes;
    let selectedNote;
    if (!props.data.folder) {
      notes = [];
      selectedNote = undefined;
    } else if (!props.data.folder.notes) {
      notes = [];
      selectedNote = undefined;
    } else {
      notes = props.data.folder.notes;
      selectedNote = props.data.folder.notes[0];
    }

    this.setState({
      notes,
      selectedNote
    });
  }

  selectNote(idx) {
    this.setState({selectedNote: this.state.notes[idx], selectedIdx: idx});
  }

  getFolder(folderId) {
    this.props.data.refetch({id: folderId})
      .then((data) => {
        if (data.data === undefined) {
          this.getFolder(folderId);
        }
      });
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading Notes...</div>;
    }

    if (!this.state) {
      return <div>Nothing selected... yet.</div>
    }

    let note;
    if (this.props.newNote) {
      note = (
        note = <NoteForm createNote={this.props.createNote} folderId={this.props.folder.id} />
      );
    } else {
      note = <Note
                note={this.state.selectedNote}
                getFolder={this.getFolder.bind(this)}
                folders={this.props.folders}
                selectFolder={this.props.selectFolder} />
    }

    return (
      <div className="row">
        <div className="columns small-2">
          <div className="notes-list">
            {
              this.state.notes.map((note, idx) => {
                return (
                  <div key={note.id}
                    className={idx == this.state.selectedIdx ? 'active note-card' : 'note-card'}
                    onClick={() => this.selectNote(idx)}>
                    <div className="note-title text-center">
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
