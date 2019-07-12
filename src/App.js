import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  // 加载一切组件
  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  }
}

export default App;
