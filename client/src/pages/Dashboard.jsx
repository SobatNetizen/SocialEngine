import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import { Route, Link } from "react-router-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUser } from '../store/user/getUser.action'

import '../assets/css/Dash.css';
import HomePage from './HomePage';

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

    componentDidMount () {
      this.props.getUser()
      // console.log('check props', this.props)
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
      console.log('????', key)
      this.setState({
        keywordToShow: key[0].keyword
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

    sentToDV(result) {
      let dataId = result._id
      console.log('===?', dataId)
    }


    render() {
        const token = localStorage.getItem('token')
        if(token==null){
            this.props.history.push({ pathname: '/index' })
        }
        console.log("ini--------> ", this.props.datahistory)
        return (
          <div>
            <Row style={{ paddingTop: 70, backgroundColor: 'white' }} />
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
                        this.props.datahistory.length > 0 ?
                        <div>
                          <ul className="ul-margin-bottom">
                            {
                              this.props.datahistory.map((keyword, index) => (
                                <li 
                                  className="cursor animated fadeInDown"
                                  style={{ marginTop: 10, marginBottom: 10 }}
                                  onClick={() => this.setKeywordToShow(keyword) }
                                  key={index+keyword}
                                >{keyword[0].keyword}</li>
                              ))
                            }
                          </ul>
                        </div>
                        :
                        <div>Loading...</div>
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
                      this.props.datahistory ?
                      this.props.datahistory.map((keyword, index) => (
                        this.state.keywordToShow === keyword[0].keyword ?
                        <div key={index} className="animated fadeIn">
                          <hr />
                          <div
                            className="text-result-heading"
                          >Social Engine Result For <b>'{keyword[0].keyword}'</b></div>
                          <ul>
                            {
                              keyword.map((result, index) => {
                                // console.log('check date', )
                                let dateToShow = new Date(result.createdAt)
                                // let arrDate = dateToShow.split(' ')
                                // let dateString = `${arrDate[0]}, ${arrDate[2]} ${arrDate[1]} ${arrDate[3]}: ${arrDate[4]} ${arrDate[5]} ${arrDate[6]}`
                                let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                                let dateString = dateToShow.toLocaleDateString('id-ID', options)
                                console.log('test date', dateToShow, typeof dateToShow)
                                return <Link to={`/home/${result._id}`} key={index} ><li 
                                  className="cursor"
                                  style={{margin: 10}}
                                  onClick={() => this.sentToDV(result) }   
                                >{ dateString } - { result._id }</li></Link>
                              })
                            }
                          </ul>
                        </div>
                        :
                        <div key={index}></div>
                        ))
                      :
                      <div></div>
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

const mapDispatchToProps = ( dispatch ) => {
  return bindActionCreators({ getUser }, dispatch)
}

const mapStateToProps = (state) => {
  console.log('from test state', state)
  return {
      datahistory: state.user.history
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( HomePanel )
