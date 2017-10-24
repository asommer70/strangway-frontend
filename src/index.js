import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import MainScss from './scss/main.scss';

import Menu from './components/menu';
import Folders from './components/folders';

const client = new ApolloClient({uri: 'https://localhost:4430',});

class App extends Component {
  constructor(props) {
    super(props);

    const exampleFolders = [
      {id: 2, name: 'Ideers'},
      {id: 1, name: 'Mains'}
    ];

    this.state = {
      folders: exampleFolders,
      selectedFolder: exampleFolders[0]
    }
  }

  selectFolder(idx) {
    this.setState({selectedFolder: this.state.folders[idx]});
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div id="app" className="container">
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
        </div>
      </ApolloProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
