import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Menu from './menu';
import Folders from './folders';

class Main extends Component {
  constructor(props) {
    super(props);

    const exampleFolders = [
      {id: 2, name: 'Ideers'},
      {id: 1, name: 'Mains'}
    ];

    // this.state = {
    //   folders: props.data.folders,
    //   selectedFolder: props.data.folders[0]
    // }
  }

  componentWillReceiveProps(props) {
    this.setState({
      folders: props.data.folders,
      selectedFolder: props.data.folders[0]
    });
  }

  selectFolder(idx) {
    this.setState({selectedFolder: this.state.folders[idx]});
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

            <div className="columns small-10">
              <strong>{this.state.selectedFolder.name}</strong>
                <p>Going to be the grid of notes in the folder...</p>
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

export default graphql(folderQuery)(Main);
