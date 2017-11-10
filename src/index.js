import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import MainScss from './scss/main.scss';

import Main from './components/main';

const client = new ApolloClient({
  link: new HttpLink({uri: 'http://localhost:4000/graphql'}),
  cache: new InMemoryCache({
    dataIdFromObject: o => o.id
  })
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="app" className="container">
          <Main />
        </div>
      </ApolloProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
