import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import routes from "./routes";

class App extends Component {
  render() {
    return (
      <div className="App">
        {routes}
      </div>
    );
  }
}
// password: A1a1a1a1
export default App;
