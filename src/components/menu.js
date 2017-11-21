import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import Logout from '../queries/logout';

class Menu extends Component {
  logout(e) {
    e.preventDefault();
    console.log('Logging out...');
  }

  render() {
    return (
      <div>
        <ul className="menu">
          <li className="menu-text">Strangway</li>
          <li><a href="/">Notes</a></li>
        </ul>
        <ul className="menu float-right">
          <li><Link to={'/signup'}>Signup</Link></li>
          <li><Link to={'/login'}>Login</Link></li>
          <li><Link to={'/logout'}>Logout</Link></li>
        </ul>
      </div>
    );
  }
}

export default Menu;
// export default graphql(Logout, {name: 'Logout'})(Menu);
