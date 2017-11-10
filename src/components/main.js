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
    this.setState({
      folders: props.GetFolders.folders,
      selectedFolder: props.GetFolders.folders[0],
    });
  }

  selectFolder(idx) {
    this.setState({selectedFolder: this.state.folders[idx]});
  }

  createNote(note) {
    this.props.CreateNote({
      variables: { name: note.name, content: note.content, folderId: note.folderId },
      refetchQueries: [{query: FolderQuery, variables: { id: note.folderId } }]
    })
    this.setState({newNote: !this.state.newNote});
  }

  render() {
    console.log('this.props:', this.props);
    if (this.props.GetFolders.loading) {
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
              <button id="newnote" className="button small succss icon-button" onClick={() => this.setState({newNote: !this.state.newNote})}>&#43;</button>

              <Notes
                folder={this.state.selectedFolder}
                newNote={this.state.newNote}
                createNote={this.createNote.bind(this)}
                folders={this.props.GetFolders.folders}
                selectFolder={this.selectFolder.bind(this)} />
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

export default graphql(CreateNote, {name: 'CreateNote'})(graphql(folderQuery, {name: 'GetFolders'})(Main));
