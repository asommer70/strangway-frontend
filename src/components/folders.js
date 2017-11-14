import React, { Component } from 'react';
import Folder from './folder';

export default class Folders extends Component {

	renderFolders() {
		return this.props.folders.map((folder, idx) => {
			// <li key={idx}
			// 	className="folder-name"
			// 	onClick={() => this.props.selectFolder(idx)}
			// 	onDoubleClick={() => this.setState({editFolder: !this.state.editFolder})}>
			// 	{folder.name}
			// 	{this.state.editFolder ? folderForm : ''}
			// </li>
			return (
				<Folder key={folder.id} folder={folder} selectFolder={this.props.selectFolder} idx={idx} />
			);
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
