import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import DetailFB from '../components/detail/detailFb'
import DetailTwitter from '../components/detail/detailTwitter'
import DetailNews from '../components/detail/detailNews'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUser } from '../store/user/getUser.action'

import '../assets/css/Detail.css';


class DetailPage extends Component {
    constructor() {
        super()
        this.state = {
            response: 'loading',
        }
      }
  
    componentWillMount () {
        axios.get(`http://localhost:3001/users/history/${this.props.match.params.id}`)
        .then(response =>{
            console.log('Get response detail page', response)
            this.setState({
                response: response
            })
            let data = response.data.history;
            this.setState({keyword: data.keyword})
            let results = data.result
            let resultsTwitter = results[0].twitter
            this.setState({resultsTwitterNegative: resultsTwitter[0]})
            this.setState({resultsTwitterPositive: resultsTwitter[1]})
            this.setState({resultsTwitterNeutral: resultsTwitter[2]})
            let resultsFb = results[1].facebook
            this.setState({resultsFbNegative: resultsFb[0]})
            this.setState({resultsFbPositive: resultsFb[1]})
            this.setState({resultsFbNeutral: resultsFb[2]})
            let resultsNews = results[2].news
            this.setState({resultsNewsNegative: resultsNews[0]})
            this.setState({resultsNewsPositive: resultsNews[1]})
            this.setState({resultsNewsNeutral: resultsNews[2]})
        })
        .catch(err => {
            console.log('ERROR: detail page', err)
        })

        if (this.state.response !== 'loading') {
            // console.log('oi', data.keyword)
        }
    }

    componentDidMount () {
        this.props.getUser()
        // console.log('check props', this.props)
      }

    render() {
        console.log('check state detail---->?', this.state)
        return (
            <div style={{ marginTop:70,textAlign: 'left' }}>
                <Col style={{ backgroundColor: 'white', minHeight: '100%', verticalAlign:'top'}}>
                <div style={{ fontSize:40,textAlign:'right' }}><i>{this.state.keyword}</i></div>
                {
                    this.state.response == 'loading' ?
                    <div>
                        <img className="center-image" src={require('../assets/image/loading_icon.gif')} />
                    </div>
                    :
                    <Row>
                        <Col sm="4" className="border-check">
                            <div className="border-good">
                            { 
                                (this.state.resultsFbPositive) ?
                                    this.state.resultsFbPositive.length > 0 ?
                                        this.state.resultsFbPositive.map((resultFb, index) => (
                                            <DetailFB key={resultFb+index} data={resultFb}/>
                                        ))
                                    :
                                    <div className="border-facebook">No Data Shown</div>
                                :
                                <div>Loading...</div>
                            }
                            { 
                                (this.state.resultsTwitterPositive) ?
                                    this.state.resultsTwitterPositive.length > 0 ?
                                        this.state.resultsTwitterPositive.map((resultTw, index) => (
                                            <DetailTwitter key={resultTw+index} data={resultTw}/>
                                        ))
                                    :
                                    <div className="border-twitter">No Data Shown</div>
                                :
                                <div>Loading...</div>
                            }
                            { 
                                (this.state.resultsNewsPositive) ?
                                    this.state.resultsNewsPositive.length > 0 ?
                                        this.state.resultsNewsPositive.map((resultNews, index) => (
                                            <DetailNews key={resultNews+index} data={resultNews}/>
                                        ))
                                    :
                                    <div className="border-news">No Data Shown</div>
                                :
                                <div>Loading...</div>
                            }
                            </div>
                        </Col>
                        <Col sm="4" className="border-check">
                            <div className="border-neutral">
                            { 
                                (this.state.resultsFbNeutral) ?
                                    this.state.resultsFbNeutral.length > 0 ?
                                        this.state.resultsFbNeutral.map((resultFb, index) => (
                                            <DetailFB key={resultFb+index} data={resultFb}/>
                                        ))
                                    :
                                    <div className="border-facebook">No Data Shown</div>
                                :
                                <div>Loading...</div>
                            }
                            { 
                                (this.state.resultsTwitterNeutral) ?
                                    this.state.resultsTwitterNeutral.length > 0 ?
                                        this.state.resultsTwitterNeutral.map((resultTw, index) => (
                                            <DetailTwitter key={resultTw+index} data={resultTw}/>
                                        ))
                                    :
                                    <div className="border-twitter">No Data Shown</div>
                                :
                                <div>Loading...</div>
                            }
                            { 
                                (this.state.resultsNewsNeutral) ?
                                    this.state.resultsNewsNeutral.length > 0 ?
                                        this.state.resultsNewsNeutral.map((resultNews, index) => (
                                            <DetailNews key={resultNews+index} data={resultNews}/>
                                        ))
                                    :
                                    <div className="border-news">No Data Shown</div>
                                :
                                <div>Loading...</div>
                            }
                            </div>
                        </Col>
                        <Col sm="4" className="border-check">
                            <div className="border-bad">
                                { 
                                    (this.state.resultsFbNegative) ?
                                        this.state.resultsFbNegative.length > 0 ?
                                            this.state.resultsFbNegative.map((resultFb, index) => {
                                                // let obj = {
                                                //     detail: {
                                                //         profileName: 'Unknown',
                                                //         opinion: resultFb,
                                                //         opinionUrl: 'Unknown'
                                                //     }
                                                // }
                                                return <DetailFB key={resultFb+index} data={resultFb}/>
                                            })
                                        :
                                        <div className="border-facebook">No Data Shown</div>
                                    :
                                    <div>Loading...</div>
                                }
                                { 
                                    (this.state.resultsTwitterNegative) ?
                                        this.state.resultsTwitterNegative.length > 0 ?
                                            this.state.resultsTwitterNegative.map((resultTw, index) => (
                                                <DetailTwitter key={resultTw+index} data={resultTw}/>
                                            ))
                                        :
                                        <div className="border-twitter">No Data Shown</div>
                                    :
                                    <div>Loading...</div>
                                }
                                { 
                                    (this.state.resultsNewsNegative) ?
                                        this.state.resultsNewsNegative.length > 0 ?
                                            this.state.resultsNewsNegative.map((resultNews, index) => (
                                                <DetailNews key={resultNews+index} data={resultNews}/>
                                            ))
                                        :
                                        <div className="border-news">No Data Shown</div>
                                    :
                                    <div>Loading...</div>
                                }
                            </div>
                        </Col>
                    </Row>
                }
                </Col>
             
            </div>
            // <Container>
            //     <Row style={{ 
            //         backgroundColor: '#fff',
            //         marginTop: 15,
            //         padding: 20
            //     }}>
            //         <h4>Twitter</h4>
            //         <Table striped>
            //             <thead>
            //                 <tr>
            //                     <th>#</th>
            //                     <th>First Name</th>
            //                     <th>Last Name</th>
            //                     <th>Username</th>
            //                 </tr>
            //             </thead>
            //             <tbody>
            //                 <tr>
            //                     <th scope="row">1</th>
            //                     <td>Mark</td>
            //                     <td>Otto</td>
            //                     <td>@mdo</td>
            //                 </tr>
            //                 <tr>
            //                     <th scope="row">2</th>
            //                     <td>Jacob</td>
            //                     <td>Thornton</td>
            //                     <td>@fat</td>
            //                 </tr>
            //             <tr>
            //                 <th scope="row">3</th>
            //                 <td>Larry</td>
            //                 <td>the Bird</td>
            //                 <td>@twitter</td>
            //             </tr>
            //             </tbody>
            //         </Table>
            //     </Row>

            //     <Row style={{ 
            //         backgroundColor: '#fff',
            //         marginTop: 15,
            //         padding: 20
            //     }}>
            //         <h4>Facebook</h4>
            //         <Table striped>
            //             <thead>
            //                 <tr>
            //                     <th>#</th>
            //                     <th>First Name</th>
            //                     <th>Last Name</th>
            //                     <th>Username</th>
            //                 </tr>
            //             </thead>
            //             <tbody>
            //                 <tr>
            //                     <th scope="row">1</th>
            //                     <td>Mark</td>
            //                     <td>Otto</td>
            //                     <td>@mdo</td>
            //                 </tr>
            //                 <tr>
            //                     <th scope="row">2</th>
            //                     <td>Jacob</td>
            //                     <td>Thornton</td>
            //                     <td>@fat</td>
            //                 </tr>
            //             <tr>
            //                 <th scope="row">3</th>
            //                 <td>Larry</td>
            //                 <td>the Bird</td>
            //                 <td>@twitter</td>
            //             </tr>
            //             </tbody>
            //         </Table>
            //     </Row>

            //     <Row style={{ 
            //         backgroundColor: '#fff',
            //         marginTop: 15,
            //         marginBottom: 50,
            //         padding: 20
            //     }}>
            //         <h4>News Blog</h4>
            //         <Table striped>
            //             <thead>
            //                 <tr>
            //                     <th>#</th>
            //                     <th>First Name</th>
            //                     <th>Last Name</th>
            //                     <th>Username</th>
            //                 </tr>
            //             </thead>
            //             <tbody>
            //                 <tr>
            //                     <th scope="row">1</th>
            //                     <td>Mark</td>
            //                     <td>Otto</td>
            //                     <td>@mdo</td>
            //                 </tr>
            //                 <tr>
            //                     <th scope="row">2</th>
            //                     <td>Jacob</td>
            //                     <td>Thornton</td>
            //                     <td>@fat</td>
            //                 </tr>
            //             <tr>
            //                 <th scope="row">3</th>
            //                 <td>Larry</td>
            //                 <td>the Bird</td>
            //                 <td>@twitter</td>
            //             </tr>
            //             </tbody>
            //         </Table>
            //     </Row>
            // </Container>
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
  
  export default connect( mapStateToProps, mapDispatchToProps )( DetailPage )