import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import '../../assets/css/Detail.css';


class DetailFB extends Component {
  render() {
    console.log('from detailfb', this.props.data)
    return (
      <div className="border-facebook">
        <Row>
            <Col sm="6">
                <div className="name">{this.props.data.detail.profileName || 'Unknown'}</div>
            </Col>
            <Col sm="6">
                <div className="color-facebook">Facebook</div>
            </Col>
        </Row>
        <div className="post">"{this.props.data.detail.opinion || 'Unknown'}"</div>
        <div className="source">Source: <a href={this.props.data.detail.opinionUrl || 'Unknown'} target="_blank">{this.props.data.detail.opinionUrl}</a></div>
      </div>
    );
  }
}

export default DetailFB;