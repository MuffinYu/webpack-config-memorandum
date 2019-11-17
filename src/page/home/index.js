import React, { Component } from 'react';
import './index.less';
import { Row, Button } from "antd";

export default class extends Component {
  constructor() {
    super();
    this.state = {
      name: 'aaasaasdasds'
    }
  }
  lazyClick(a, b, c) {
    import('./lazy').then(module => {
      console.log("lazy module", module);
      var lazy = module.default;
      lazy(a, b, c);
    })
  }
  render() {
    const { name } = this.state;
    
    return (
      <div className="home">
        home ????
        <Row>
          Row
          {name}
        </Row>
        <Button onClick={() => this.lazyClick(1, 2, 3)}>
          click me 
        </Button>
      </div>
    );
  }
}
