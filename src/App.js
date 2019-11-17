import React, { Component } from 'react';
import './App.css';
import {
  HashRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
// import { Home, About, Topics } from './page';
import loadable from "@loadable/component";
import { Spin } from 'antd';

const Home = loadable(() => import("./page/home/index.js"), {
  fallback: <Spin />
});
const About = loadable(() => import("./page/about/index.js"), {
  fallback: <Spin />
});
const Topics = loadable(() => import("./page/topics/index.js"), {
  fallback: <Spin />
});

export default class extends Component {
  render() {
    return (
      <Router>
        <div className="main">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>
        </div>
        <hr />
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
      </Router>
    );
  }
}
