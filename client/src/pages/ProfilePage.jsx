import React, { Component } from 'react';
// import { Container, Row, Col, CardImg } from 'reactstrap';
import { Container, Row, Col, 
    Button, } from 'reactstrap';

import '../assets/css/Dash.css';


class ProfilePage extends Component {
    constructor(){
        super()
        this.state = {
            status: false
        }
    }

    changeStatus () {
        if (this.state.status === false) {
            this.setState({
                status: true
            })
        } else {
            this.setState({
                status: false
            })
        }
    }

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
          console.log('enter press here! ')
          this.changePassword()
        }
      }
  
    addButton () {
        this.changePassword()
    }

    changePassword () {

    }
  

    render() {
        console.log('from profile', this.state)
        return (
            <Container>
                <Row>
                    <Col sm="12" style={{ 
                        backgroundColor: '#fff',
                        marginTop: 200,
                        borderRadius: 10,
                        minHeight: 150
                    }}>
                        {/* <Col sm="3">
                            <h3 style={{ 
                                fontWeight: 'bold',
                                marginTop: 20,
                                marginBottom: 20
                             }}>Fill Your Profile :</h3>
                            <CardImg width="200" height="200" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/1024px-Placeholder_no_text.svg.png" alt="Generic placeholder image" />
                        </Col>
                        <Col sm="6">
                        </Col> */}
                        <Row>
                            <Col sm="7" style={{
                                // marginTop: 200,
                                backgroundColor: '#fff',
                                padding: 30,
                                borderRadius: 10,
                            }}>
                                <img className="img-logo-radar" src={require('../assets/image/radar-logo.jpg')} />
                            </Col>
                            <Col sm="5" style={{
                                // marginTop: 50,
                                backgroundColor: '#fff',
                                padding: 30,
                                borderRadius: 10
                            }}>
                                <h3 style={{ marginBottom: 50 }} className="h3-margin-0"><b>Profile</b></h3>
                                <table className="text-left">
                                    <tbody>
                                        <tr>
                                            <td><b>Company Name</b></td>
                                            <td><b>:</b></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><b>Email</b></td>
                                            <td><b>:</b></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Button color="" type="submit" style={{backgroundColor: '#9D3862', width:'100%', marginTop: 10, color: 'white'}} onClick={ () => this.changeStatus() }>Change Password</Button>
                                {
                                    this.state.status === true ?                                    
                                        <div>
                                            <Row
                                                className="row"
                                                style={{marginTop:10, paddingLeft: 5}}
                                            >
                                                <input 
                                                    className="input-password" 
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
                                    :
                                    <div></div>
                                }
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ProfilePage;