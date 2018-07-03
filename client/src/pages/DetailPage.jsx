import React, { Component } from 'react';
import { Container, Row, Table, Col } from 'reactstrap';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUser } from '../store/user/getUser.action'

import '../assets/css/Detail.css';


class DetailPage extends Component {
    componentDidMount () {
        this.props.getUser()
        // console.log('check props', this.props)
      }

    render() {
        return (
            <div style={{ marginTop:70, backgroundColor: 'white', height: '91vh', textAlign: 'left' }}>
                <Row>
                    <Col sm="4" className="border-check">
                        <div className="border-good">
                            <div className="border-facebook">
                                <Row>
                                    <Col sm="6">
                                        <div className="name">Austin Shippey</div>
                                    </Col>
                                    <Col sm="6">
                                        <div className="color-facebook">Facebook</div>
                                    </Col>
                                </Row>
                                <div className="post">"Most people askimg me why samsung is better than huawei? Here this is my answer..... Samsung is better than Huawei in many ways first and foremost is Samsung‘s experience in making top notch products...."</div>
                                <div className="source">Source: https://www.facebook.com/prashan.madhusankha/posts/1537393656365203</div>
                            </div>
                        </div>
                    </Col>
                    <Col sm="4" className="border-check">
                        <div className="border-neutral">
                            <div className="border-twitter">
                                <Row>
                                    <Col sm="6">
                                        <div className="name">Austin Shippey</div>
                                    </Col>
                                    <Col sm="6">
                                        <div className="color-twitter">Twitter</div>
                                    </Col>
                                </Row>
                                <div className="post">"Most people askimg me why samsung is better than huawei? Here this is my answer..... Samsung is better than Huawei in many ways first and foremost is Samsung‘s experience in making top notch products...."</div>
                                <div className="source">Source: https://www.facebook.com/prashan.madhusankha/posts/1537393656365203</div>
                            </div>
                        </div>
                    </Col>
                    <Col sm="4" className="border-check">
                        <div className="border-bad">
                        <div className="border-news">
                                <Row>
                                    <Col sm="6">
                                        <div className="name">Austin Shippey</div>
                                    </Col>
                                    <Col sm="6">
                                        <div className="color-news">News</div>
                                    </Col>
                                </Row>
                                <div className="post">"Most people askimg me why samsung is better than huawei? Here this is my answer..... Samsung is better than Huawei in many ways first and foremost is Samsung‘s experience in making top notch products...."</div>
                                <div className="source">Source: https://www.facebook.com/prashan.madhusankha/posts/1537393656365203</div>
                            </div>
                        </div>
                    </Col>
                </Row>
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