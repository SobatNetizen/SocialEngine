import React, { Component } from 'react';
import { Container, Row, Col, 
    Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from '../store/user/login.action'
// import axios from 'axios';
// import swal from 'sweetalert';

import '../assets/css/Dash.css';

class IndexPage extends Component {
    constructor(){
        super()
        this.state = {
        }
    }

    render() {
        return (
          <div>
            <div>
              <Row sm="12" className="img-top">
                <img className="img" src={require('../assets/image/socmed.jpg')} />
              </Row>
              <Row>
                <Col sm="6" className="one-row">
                  {/* Index1 */}
                  <img className="img" src={require('../assets/image/spashbrand1.jpeg')} />
                </Col>
                <Col sm="6" className="two-row">
                  <div  className="index-head">
                    <div className="index-one">
                      Discover
                    </div>
                    <div className="index-two">
                      Listen Any Public Conversation
                    </div>
                    <div className="index-three">
                      Find conversations on any keyword, allowing you to instantly uncover rising trends and issues specially for Indonesian market.
                    </div>
                  </div>
                  {/* <img className="img" src={require('../assets/image/spashfb.jpeg')} /> */}
                </Col>
              </Row>
              <Row>
                <Col sm="6" className="one-row">
                  Index1
                </Col>
                <Col sm="6" className="two-row">
                  {/* Index2 */}
                  <img className="img" src={require('../assets/image/spashfb.jpeg')} />
                </Col>
              </Row>
              <Row>
                <Col sm="6" className="one-row">
                  {/* Index1 */}
                  <img className="img" src={require('../assets/image/spashtwitter.jpeg')} />
                </Col>
                <Col sm="6" className="two-row">
                  Index2
                  {/* <img className="img" src={require('../assets/image/spashfb.jpeg')} /> */}
                </Col>
              </Row>
              <Row>
                <Col sm="6" className="one-row">
                  Index1
                </Col>
                <Col sm="6" className="two-row">
                  {/* Index2 */}
                  <img className="img" src={require('../assets/image/spashnews.jpeg')} />
                </Col>
              </Row>
            </div>
          </div>
        );
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return bindActionCreators({ login }, dispatch)
}

export default connect( null, mapDispatchToProps )( IndexPage )
