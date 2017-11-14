import React, { Component } from 'react';
import Folder from './folder';

export default class Folders extends Component {

	renderFolders() {
		return this.props.folders.map((folder, idx) => {
			return (
				<Folder key={folder.id}
					folder={folder}
					selectFolder={this.props.selectFolder}
					idx={idx}
					getFolders={this.props.getFolders} />
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
