import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Menu from './menu';
import Folders from './folders';
import Notes from './notes';
import Note from './note';
import CreateNote from '../queries/create_note';
import DeleteNote from '../queries/delete_note';
import FolderQuery from '../queries/get_folder';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newNote: false
    }
  }

  componentWillReceiveProps(props) {
    console.log('Main componentWillReceiveProps props:', props);
    this.setState({
      folders: props.data.folders,
      selectedFolder: props.data.folders[0],
      refetch: props.data.refetch
    });
  }

  selectFolder(idx) {
    this.setState({selectedFolder: this.state.folders[idx]});
  }

  createNote(note) {
    this.props.mutate({
      variables: { name: note.name, content: note.content, folderId: note.folderId },
      refetchQueries: [{query: FolderQuery, variables: { id: note.folderId } }]
    })
    this.setState({newNote: !this.state.newNote});
  }

  getFolder(folderId) {
    console.log('Main deleteNote this.props:', this.props);
    this.props.data.refetch({id: folderId});
    // this.props.mutate({
    //   variables: { id: note.id },
    //   refetchQueries: [{query: FolderQuery, variables: { id: note.folderId } }]
    // });
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading Folders...</div>;
    }

    return (
      <div className="row">
        <div className="columns small-12">

          <Menu />

          <div className="row">
            <div className="columns small-1">
              <Folders folders={this.state.folders} selectFolder={this.selectFolder.bind(this)} />
            </div>

            <div className="columns small-11">
              <strong>{this.state.selectedFolder.name}</strong>
              <br/>
              <button className="button tiny succss" onClick={() => this.setState({newNote: !this.state.newNote})}>Add Note</button>

              <Notes
                folder={this.state.selectedFolder}
                newNote={this.state.newNote}
                createNote={this.createNote.bind(this)}
                getFolder={this.getFolder.bind(this)} />
            </div>

          </div>
        </div>
      </div>
    );
  }
}

const folderQuery = gql`
  {
    folders {
      id,
      name
    }
  }
`;

export default graphql(CreateNote)(graphql(folderQuery)(Main));
