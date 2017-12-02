import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link, Redirect } from 'react-router-dom';
import Logout from '../queries/logout';
import CurrentUser from '../queries/current_user';

class Menu extends Component {
  logout(e) {
    e.preventDefault();
    this.props.Logout()
      .then(() => {
        this.props.CurrentUser.refetch();
      })
  }

  render() {
    if (this.props.CurrentUser.loading) {
      return <div />;
    }

    let actionLinks;
    if (this.props.CurrentUser.user) {
      actionLinks = (
        <ul className="menu float-right">
          <li><a onClick={this.logout.bind(this)}>Logout</a></li>
        </ul>
      );
    } else {
      actionLinks = (
        <ul className="menu float-right">
          <li><Link to={'/signup'}>Signup</Link></li>
          <li><Link to={'/login'}>Login</Link></li>
        </ul>
      );
    }

    return (
      <div>
        <ul className="menu">
          <li className="menu-text">Strangway</li>
          <li><a href="/">Notes</a></li>
        </ul>
        {actionLinks}
        <hr className="menu-hr" />

        <div className="row">
          <div className="columns small-12">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

// export default Menu;
export default graphql(CurrentUser, {name: 'CurrentUser'})(
  graphql(Logout, {name: 'Logout'})(Menu)
);
