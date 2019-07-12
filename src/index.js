import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/demo/Life';
// import Admin from './admin'
// import Home from './pages/route_demo/route2/Home'
// import Router from './pages/route_demo/route3/router'
import Router from './router'
import * as serviceWorker from './serviceWorker';

// reactdom 初始化一个跟组件
ReactDOM.render(<Router />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
