import React, { Component } from 'react';
import { Container, Row, Col,
  Card, CardBody, CardTitle
} from 'reactstrap';
import axios from 'axios';

import '../assets/css/Dash.css';

class HomePanel extends Component {
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

    getKeywords() {
      this.setState({
        status: 'keywords',
      })
      if (this.state.statusKeyword === 'disabled') {
        this.setState({
          statusKeyword: 'show',
        })
      } else {
        this.setState({
          statusKeyword: 'disabled',
          keywordToShow: '',
        })
      }
      // console.log('keywords', this.state.status)
    }

    setKeywordToShow(key) {
      this.setState({
        keywordToShow: key
      })
      // console.log('oi', this.state.keywordToShow)
    }

    getHistory() {
      this.setState({
        status: 'history',
        statusKeyword: 'disabled',
        keywordToShow: '',
      })
      // console.log('history', this.state.status)
    }

    handleKeyPress = (event) => {
      if(event.key == 'Enter'){
        console.log('enter press here! ')
        this.postToServer()
      }
    }

    postToServer () {
      let token = localStorage.getItem('token')

      let config = {
        headers: {'token': token}
      }

      let input = {
        keyword: this.state.inputKeyword
      }

      axios.put('http://localhost:3001/users/keyword', input, config)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log('ERROR: dashboard add keyword')
      })
    }

    handleChanges (e) {
      const target = e.target
      const name = target.name
      const value = target.value
      this.setState({
        [name]: value
      })
      console.log('check state', this.state)
    }  

    render() {
        const token = localStorage.getItem('token')
        if(token==null){
            this.props.history.push({ pathname: '/' })
        }
        return (
          <div>
            <Row>
              <Col sm="2" className="no-padding-left-right">
                <div className="sidenav">
                  <div 
                    className="sidenav-panel"
                    onClick={ () => this.getKeywords()}
                  >
                    Keywords
                  </div>
                  <div
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
                  </div>
                </div>
              </Col>
              <Col sm="10" className="no-padding-left-right">
                <div className="display-panel">
                {
                  this.state.status === 'initial' ?
                  <div>
                    Welcome to Radar Social !!
                  </div>
                  :
                  <div></div>
                }
                {
                  this.state.status === 'keywords' ?
                  <div>
                    Keywords
                    <div>
                      <input 
                        className="keyword" 
                        name="inputKeyword" 
                        type="text" 
                        onChange={ (e) => this.handleChanges(e) }
                        onKeyPress={this.handleKeyPress}
                      />
                      <button>ADD</button>
                    </div>
                    {
                      this.state.keywords.map((keyword, index) => (
                        this.state.keywordToShow === keyword.keyword ?
                        <div key={index} >
                          <div>Result:</div>
                          <ul>
                            {
                              keyword.results.map((result, index) => (
                                <li key={result+index} >{result}</li>
                              ))
                            }
                          </ul>
                        </div>
                        :
                        <div key={index}></div>
                        ))
                      }
                  </div>
                  :
                  <div></div>
                }
                {
                  this.state.status === 'history' ?
                  <div>
                    History
                  </div>
                  :
                  <div></div>
                }
                </div>
              </Col>
            </Row>
          </div>
        );
    }
}

export default HomePanel;