import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Route, Link } from "react-router-dom";

import '../../assets/css/Detail.css';


class DetailTwitter extends Component {
  render() {
    console.log('from DetailTwitter', this.props.data)
    return (
      <div className="border-twitter">
        <Row>
            <Col sm="6">
                <div className="name">{this.props.data.detail.username}</div>
            </Col>
            <Col sm="6">
                <div className="color-twitter">Twitter</div>
            </Col>
        </Row>
        <div className="post">"{this.props.data.detail.tweet}"</div>
        <div className="source">Source: <a href={this.props.data.detail.tweetLink} target="_blank">{this.props.data.detail.tweetLink}</a></div>
      </div>
    );
  }
}

export default DetailTwitter;