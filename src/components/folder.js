import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import UpdateFolder from '../queries/update_folder';
import DeleteFolder from '../queries/delete_folder';

class Folder extends Component {
  constructor(props) {
		super(props);

		this.state = {
			folderName: (this.props.folder ? this.props.folder.name : ''),
			editFolder: false
		}
	}

	deleteFolder(folderId) {
    if (window.confirm(`Delete ${this.state.folderName}?`)) {
      this.props.DeleteFolder({variables: {id: folderId}})
        .then(() => {
          this.props.getFolders.refetch();
        });
    }
	}

	editFolder(e) {
		e.preventDefault();
    this.props.UpdateFolder({variables: {id: this.props.folder.id, name: this.state.folderName}})
      .then(() => {
        this.props.getFolders.refetch();
      });
    this.setState({editFolder: !this.state.editFolder});
	}

  handleChange(e) {
    this.setState({folderName: e.target.value});
  }

  render() {
    const folderForm = (
      <div id="folder-form-wrapper" className="edit-form">
        <form onSubmit={this.editFolder.bind(this)}>
          <input type="text"
            name="name"
            id="name"
            className="folder-name-edit"
            value={this.state.folderName}
            onChange={this.handleChange.bind(this)} />

          <input type="hidden" name="folderIdx" value={this.props.idx}/>
          <br/>

          <button type="submit" className="button tiny icon-button edit">&#10003;</button>
            <button className="button tiny float-right alert icon-button edit"
              onClick={() => this.deleteFolder(this.props.folder.id)}>&#10007;</button>
        </form>
      </div>
    );

		return (
      <li
        className="folder-name"
        onClick={() => this.props.selectFolder(this.props.idx)}
        onDoubleClick={() => this.setState({editFolder: !this.state.editFolder})}>
        {this.props.folder.name}
        {this.state.editFolder ? folderForm : ''}
      </li>
		);
	}
}

// export default Folder;
export default graphql(DeleteFolder, {name: 'DeleteFolder'})(graphql(UpdateFolder, {name: 'UpdateFolder'})(Folder));
