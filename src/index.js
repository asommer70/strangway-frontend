import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import MainScss from './scss/main.scss';

const App = () => {
  return (
    <div className="row">
      <div className="columns small-12">
        <br/><br/>
        Strangway... and things from React...
        <br/>
        <p>Other stuff...</p>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));
