import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import FolderQuery from '../queries/get_folder';

class Notes extends Component {
  constructor(props) {
    super(props);
    // this.selectNote = this.selectNote.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      notes: props.data.folder.notes,
      selectedNote: props.data.folder.notes[0] || {}
    });
  }

  selectNote(idx) {
    this.setState({selectedNote: this.state.notes[idx]})
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading Notes...</div>;
    }

    return (
      <div className="notes-list">
        {
          this.state.notes.map((note, idx) => {
            return (
              <div key={note.id} className="card note-card">
                <div className="card-divider note-title text-center" onClick={() => this.selectNote(idx)}>
                  <strong>{note.name}</strong>
                </div>

                <div className="card-section">
                  <p>{note.content}...</p>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default graphql(FolderQuery, {
  options: (props) => { return { variables: { id: props.folder.id } } }
})(Notes);
