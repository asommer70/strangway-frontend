import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

class Folders extends Component {
	renderFolders() {
		return this.props.folders.map((folder, idx) => {
			return <li key={idx} className="folder-name" onClick={() => this.props.selectFolder(idx)}>{folder.name}</li>
		});
	}

	render() {
		return (
			<div>
				<strong>Folders</strong>
				<ul className="no-bullet">
					{this.renderFolders()}
				</ul>
			</div>
		);
	}
}

export default createFragmentContainer(Folders, graphql`
	fragment Folders_folders on Folders {
		id
		name
	}
`)
