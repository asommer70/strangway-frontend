import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import MainScss from './scss/main.scss';

import Main from './components/main';
import Signup from './components/signup';
import Signout from './components/signout';
import Login from './components/login';

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
        <Router>
          <div id="app" className="container">
            <Route exact path="/" component={Main}/>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Signout} />
          </div>
        </Router>
      </ApolloProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
