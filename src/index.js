import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainScss from './scss/main.scss';

import Main from './components/main';
import Signup from './components/signup';
import Logout from './components/logout';
import Login from './components/login';

const client = new ApolloClient({
  link: new HttpLink({uri: 'http://localhost:4000/graphql', credentials: 'include'}),
  cache: new InMemoryCache({
    dataIdFromObject: o => o.id
  })
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div id="app" className="container">
            <Route exact path="/" component={Main} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
          </div>
        </BrowserRouter>
      </ApolloProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
