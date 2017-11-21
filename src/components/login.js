import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import LoginMutation from '../queries/login';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errors: []
    }
  }

  login(e) {
    e.preventDefault();
    this.props.mutate({
      variables: {
        username: this.state.username,
        password: this.state.password
      }
    }).then(() => { window.location.href = '/' })
    .catch((res) => {
      console.log('Login.login() res.graphQLErrors[0].message:', res.graphQLErrors[0].message);
      this.setState({errors: res.graphQLErrors.map((err) => err.message)});
    })
  }

  render() {
    let flash;
    if (this.state.errors.length > 0) {
      flash = (
        <div class="callout alert">
          <h5>Sorry, there was a problem:</h5>
          <p>{this.state.errors[0]}</p>
        </div>
      );
    } else {
      flash = <div></div>;
    }

    return (
      <div className="row">
        <div className="columns small-12">
          <br/>
          <form onSubmit={this.login.bind(this)}>
            <fieldset className="large-4 cell">
              <legend>Login</legend>
                <div className="grid-container">
                  <div className="grid-x grid-padding-x">
                    <div className="medium-12 cell">
                      <label>Username
                        <input type="text"
                          name="username"
                          onChange={ (e) => {this.setState({username: e.target.value})} }
                          value={this.state.username}  />
                      </label>
                    </div>

                    <div className="medium-12 cell">
                      <label>Password
                        <input type="password"
                          name="password"
                          onChange={ e => this.setState({password: e.target.value}) }
                          value={this.state.password} />
                      </label>
                    </div>
                  </div>

                  <div className="grid-x grid-padding-x">
                    <div className="medium-12 cell">
                      {flash}

                      <input type="submit" className="button small"/>
                    </div>
                  </div>
                </div>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default graphql(LoginMutation)(Login);
