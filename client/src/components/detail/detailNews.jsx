import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Route, Link } from "react-router-dom";

import '../../assets/css/Detail.css';


class DetailTwitter extends Component {
  render() {
    console.log('from detailnews', this.props.data)
    return (
      <div className="border-news">
        <Row>
            <Col sm="6">
                {/* <div className="name">Austin Shippey</div> */}
            </Col>
            <Col sm="6">
                <div className="color-news">News</div>
            </Col>
        </Row>
        <div className="post">"{this.props.data.detail}"</div>
        {/* <div className="source">Source: https://www.facebook.com/prashan.madhusankha/posts/1537393656365203</div> */}
    </div>
    );
  }
}

export default DetailTwitter;