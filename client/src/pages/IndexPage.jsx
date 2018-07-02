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
                  <img className="img" src={require('../assets/image/spashbrand1.jpeg')} />
                </Col>
                <Col sm="6" className="two-row">
                  <Col sm={{ size: 7, offset: 2 }}  className="index-head">
                    <div className="index-one">
                      Discover &
                    </div>
                    <div className="index-two">
                      Listen Any Public
                    </div>
                    <div className="index-two">
                      Conversation
                    </div>
                    <div className="index-three">
                      Find conversations on any keyword, allowing you to instantly uncover rising trends and issues specially for Indonesian market.
                    </div>
                  </Col>
                </Col>
              </Row>
              <Row>
                <Col sm="6" className="one-row">
                  <Col sm={{ size: 7, offset: 3 }}  className="index-head">
                    <div className="index-two">
                      Complete & Real-Time
                    </div>
                    <div className="index-two">
                      Coverage
                    </div>
                    <div className="index-three">
                      Get complete coverage across all major social media channels, such as Facebook and Twitter, along with other important digital channels, which includes the major Online News portals.
                    </div>
                  </Col>
                </Col>
                <Col sm="6" className="two-row">
                  <img className="img" src={require('../assets/image/spashfb.jpeg')} />
                </Col>
              </Row>
              <Row>
                <Col sm="6" className="one-row">
                  <img className="img" src={require('../assets/image/spashtwitter.jpeg')} />
                </Col>
                <Col sm="6" className="two-row">
                  <Col sm={{ size: 7, offset: 2 }}  className="index-head">
                    <div className="index-two">
                      Sentiment Analysis
                    </div>
                    <div className="index-two">
                      in Bahasa Indonesia
                    </div>
                    <div className="index-three">
                      Capture and learn how your audience is reacting to your products, brand and campaign, or the organization or even the industry in general with local sentiment analysis. Take it further and uncover the overall conversational moods along with the users behind the sentiment.
                    </div>
                  </Col>
                </Col>
              </Row>
              <Row>
                <Col sm="6" className="one-row margin-bottom-10">
                  <Col sm={{ size: 7, offset: 3 }}  className="index-head">
                      <div className="index-two">
                        Generate Automated                       
                      </div>
                      <div className="index-two">
                        Reports
                      </div>
                      <div className="index-three">
                        Automated reports are now available, you can see reports on generated social data daily! View your harnessed data complete with full analysis, including trend analysis, sentiment analysis, and the user demography.
                      </div>
                    </Col>
                </Col>
                <Col sm="6" className="two-row margin-bottom-10">
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
