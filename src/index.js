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
import RequireAuth from './components/require_auth';

let url;
if (process.env.NODE_ENV == 'dev') {
  url = 'http://localhost:4000/graphql'
} else {
  url = 'https://strangway.thehoick.com/graphql';
}

console.log('index.js url:', url, 'process.env.NODE_ENV:', process.env.NODE_ENV);

const client = new ApolloClient({
  link: new HttpLink({uri: url, credentials: 'include'}),
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
            <Route exact path="/" component={RequireAuth(Main)} />
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
