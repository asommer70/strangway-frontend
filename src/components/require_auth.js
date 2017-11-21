import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import CurrentUser from '../queries/current_user';

class RequireAuth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect = (<Redirect to={ { pathname: '/login', state: { from: this.props.location }} } />)
    }
  }

  componentDidMount() {
    if () {

    }
  }

  render() {
    return (
      <div>{!this.props.CurrentUser.loading && !this.props.CurrentUser.user ? this.state.redirect : ''}</div>
    )
  }
}

export default graphql(CurrentUser, {name: 'CurrentUser'})(
  graphql(Logout, {name: 'Logout'})(RequireAuth)
);
