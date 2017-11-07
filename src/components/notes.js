import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import FolderQuery from '../queries/get_folder';

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

  render() {
    if (this.props.data.loading) {
      return <div>Loading Notes...</div>;
    }

    return (
      <div>
        {
          this.state.notes.map((note) => {
            return <div key={note.id}>{note.name}</div>
          })
        }
      </div>
    )
  }
}

export default graphql(FolderQuery, {
  options: (props) => { return { variables: { id: props.folder.id } } }
})(Notes);
