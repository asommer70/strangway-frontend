import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div className="row">
        <div className="columns small-12">
          <br/>
          <form>
            <fieldset className="large-4 cell">
              <legend>Log Into Strangway</legend>
                <div className="grid-container">
                  <div className="grid-x grid-padding-x">
                    <div className="medium-12 cell">
                      <label>Username
                        <input type="text" />
                      </label>
                    </div>

                    <div className="medium-12 cell">
                      <label>Password
                        <input type="password" />
                      </label>
                    </div>
                  </div>

                  <div className="grid-x grid-padding-x">
                    <div className="medium-12 cell">
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

export default Login;
