import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import UpdateFolder from '../queries/update_folder';
import DeleteFolder from '../queries/delete_folder';

class Folder extends Component {
  constructor(props) {
		super(props);

		this.state = {
			folderName: '',
			editFolder: false
		}
	}

	deleteFolder(folderId) {
		console.log('Folders deleteFolder folderId:', folderId);
	}

	editFolder(e) {
		e.preventDefault();
		console.log('Folders editFolder e:', e);
	}

  render() {
    const folderForm = (
      <div id="folder-form-wrapper" className="edit-form">
        <form onSubmit={this.editFolder.bind(this)}>
          <input type="text"
            name="name"
            id="name"
            value={this.state.newFolderName}
            onChange={(e) => this.setState({folderName: e.target.value})}
            value={this.props.folder.name} />

          <input type="hidden" name="folderIdx" value={this.props.idx} />
          <br/>

          <button type="submit" className="button tiny">&#10003;</button>
            <button className="button tiny float-right alert icon-button"
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
