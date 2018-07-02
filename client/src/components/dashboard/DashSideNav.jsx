import React, { Component } from 'react';
import { Container, Row, Col,
  Card, CardBody, CardTitle
} from 'reactstrap';
import axios from 'axios';

import '../../assets/css/Dash.css';

class SideNav extends Component {
    constructor() {
      super()
      this.state = {
        status: 'initial',
        statusKeyword: 'disabled',
        keywordToShow: '',
        keywords: [{
          keyword: 'samsung',
          results: [ 'Cronjob1', 'Cronjob2' ]
        }, {
          keyword: 'unilever',
          results: [ 'Cronjob3', 'Cronjob4' ]
        }, {
          keyword: 'iphone',
          results: [ 'Cronjob5', 'Cronjob6' ]
        }]
      }
    }

    render() {
        console.log('from dashsidenav', this.props)
        const token = localStorage.getItem('token')
        if(token==null){
            this.props.history.push({ pathname: '/' })
        }
        return (
          <Col sm="2" className="no-padding-left-right">
            <div className="sidenav">
              <div 
                className="sidenav-panel"
                onClick={ this.props.getKeywords }
              >
                Keywords
              </div>
              {/* <div
                className="sidenav-bottom"
              >
                {
                  this.state.statusKeyword === 'show' ?
                  <div>
                    <ul className="ul-margin-bottom">
                      {
                        this.state.keywords.map((keyword, index) => (
                          <li 
                            className="cursor"
                            onClick={() => this.setKeywordToShow(keyword.keyword) }
                            key={index+keyword}
                          >{keyword.keyword}</li>
                        ))
                      }
                    </ul>
                  </div>
                  :
                  <div></div>
                }
              </div>
              <div 
                className="sidenav-panel"
                onClick={ () => this.getHistory()}
              >
                History
              </div>
              <div
                className="sidenav-bottom"
              >
              </div> */}
            </div>
          </Col>
        );
    }
}

export default SideNav;