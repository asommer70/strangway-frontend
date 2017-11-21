import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Menu from './menu';
import Folders from './folders';
import Notes from './notes';
import Note from './note';
import CreateNote from '../queries/create_note';
import FolderQuery from '../queries/get_folder';
import CreateFolder from '../queries/create_folder';
import CurrentUser from '../queries/current_user';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newNote: false,
      newFolder: false,
      newFolderName: ''
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      folders: props.GetFolders.folders,
      selectedFolder: (props.GetFolders.folders ? props.GetFolders.folders[0] : []),
      user: props.CurrentUser.user
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

  newFolder(e) {
    e.preventDefault();
    this.props.CreateFolder({
      variables: {name: this.state.newFolderName}
    })
      .then((data) => {
        this.props.GetFolders.refetch();
      });
    this.setState({newFolder: !this.state.newFolder, newFolderName: ''});
  }

  render() {
    if (this.props.GetFolders.loading) {
      return <div>Loading Folders...</div>;
    }

    let newFolderForm;
    if (this.state.newFolder) {
      newFolderForm = (
        <div id="folder-form-wrapper">
          <form onSubmit={this.newFolder.bind(this)}>
            <input type="text"
              name="name"
              id="name"
              value={this.state.newFolderName}
              onChange={(e) => this.setState({newFolderName: e.target.value})}
              placeholder="Name" />

            <button type="submit" className="button tiny">&#10003;</button>
          </form>
        </div>
      )
    } else {
      newFolderForm = '';
    }

    return (
      <div className="row">
        <div className="columns small-12">

          <Menu />

          <div className="row">
            <div className="columns small-1">
              <Folders
                folders={this.props.GetFolders.folders}
                selectFolder={this.selectFolder.bind(this)}
                getFolders={this.props.GetFolders} />
              <button
                id="newfolderButton"
                className="button tiny succss icon-button"
                onClick={() => this.setState({newFolder: !this.state.newFolder})}>
                &#43;
              </button>
              {newFolderForm}

            </div>

            <div className="columns small-11">
              <strong>{this.state.selectedFolder.name}</strong>
              <br/>
              <button
                id="newnote"
                className="button small succss icon-button"
                onClick={() => this.setState({newNote: !this.state.newNote})}>
                &#43;
              </button>

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

export default graphql(CurrentUser, {name: 'CurrentUser'})(
  graphql(CreateFolder, {name: 'CreateFolder'})(
    graphql(CreateNote, {name: 'CreateNote'})(
      graphql(folderQuery, {name: 'GetFolders'})(Main)
    )
  )
);

// export default graphql(CreateFolder, {name: 'CreateFolder'})(
//   graphql(CreateNote, {name: 'CreateNote'})(
//     graphql(folderQuery, {name: 'GetFolders'})(Main)
//   )
// );
