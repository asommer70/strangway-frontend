import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import CurrentUser from '../queries/current_user';

export default (WrappedComponent) => {
  class RequireAuth extends Component {
    constructor(props) {
      super(props);
    }

    componentWillUpdate(props) {
      if (!props.CurrentUser.loading && !props.CurrentUser.user) {
        this.props.history.push('/login');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return graphql(CurrentUser, {name: 'CurrentUser'})(RequireAuth);
}
