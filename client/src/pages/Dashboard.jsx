import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import axios from 'axios';

import '../assets/css/Dash.css';

class HomePanel extends Component {
    constructor() {
      super()
      this.state = {
        status: 'keywords',
        statusKeyword: 'disabled',
        statusSent: false,
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
        statusSent: false
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
      if(event.key === 'Enter'){
        console.log('enter press here! ')
        this.postToServer()
      }
    }

    addButton () {
      this.postToServer()
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
        this.setState({
          statusSent: true
        })
  
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
                    Saved Keywords
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
                                className="cursor animated fadeInDown"
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
                  {/* <div 
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
                  this.state.status === 'keywords' && this.state.statusSent === false ?
                  <div>
                    Add Keywords
                    <div>
                      <Row
                        className="row"
                      >
                        <input 
                          className="input-keyword" 
                          name="inputKeyword" 
                          type="text" 
                          onChange={ (e) => this.handleChanges(e) }
                          onKeyPress={this.handleKeyPress}
                        />
                        <i 
                          className="medium material-icons cursor add-icon"
                          onClick={ () => this.addButton() }
                        >add_circle_outline
                        </i>
                      </Row>
                    </div>
                    {
                      this.state.keywords.map((keyword, index) => (
                        this.state.keywordToShow === keyword.keyword ?
                        <div key={index} className="animated fadeIn">
                          <hr />
                          <div
                            className="text-result-heading"
                          >Social Engine Result For <b>'{keyword.keyword}'</b></div>
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
                  <div className="loading-icon animated fadeIn">
                    <div
                      className="loading-text"
                    >
                      <img src={require('../assets/image/loading_icon.gif')} />
                    </div>
                    <div
                      className="loading-text"
                    >
                      Your keyword has been saved and is being processed by our Social Engine.
                    </div>
                    <div
                      className="loading-text"
                    >
                      We'll notify you via email when your result is finished.
                    </div>
                  </div>
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