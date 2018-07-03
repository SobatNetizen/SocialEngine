import React, { Component } from 'react';
import { Container, Row, Col, 
    Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, } from 'react-router-dom';

import { login } from '../store/user/login.action'
import '../assets/css/Dash.css';


class LoginPage extends Component {

    constructor(){
        super()
        this.state = {
            email: '',
            password: ''
        }
    }

    handleLogin = (event) => {
        event.preventDefault()
        this.setState({[event.target.name]: event.target.value})
    }
    
    handleSubmit = ( event ) => {
        event.preventDefault()
        this.props.login( this.state.email, this.state.password, this.props.history )
    }

    render() {
        const token = localStorage.getItem('token')
        if(token){
            this.props.history.push({ pathname: '/dashboard' })
        }
        return (
            <Container>
                <Row style={{backgroundColor:'white', marginTop: 200, borderRadius: 10}}>
                    <Col sm="7" style={{
                        // marginTop: 200,
                        backgroundColor: '#fff',
                        padding: 30,
                        borderRadius: 10,
                    }}>
                        <img className="img-logo-radar" src={require('../assets/image/radar-logo.jpg')} alt='logo'/>
                    </Col>
                    <Col sm="5" style={{
                        // marginTop: 200,
                        backgroundColor: '#fff',
                        padding: 30,
                        borderRadius: 10
                    }}>
                        <h3 style={{ marginBottom: 50 }} className="h3-margin-0">Sign In</h3>
                        <small>Don't have an account yet? <Link to="/register" className="color-maroon">Register</Link></small>
                        <div className="small-auth"></div>
                        <Form onSubmit={ this.handleSubmit }>
                            <FormGroup style={{ 
                                textAlign: 'left',
                                fontSize: 14,
                                // fontWeight: 'bold'
                            }}>
                                <Label className="label-auth">Email</Label>
                                <Input onChange={ this.handleLogin } value={ this.state.email } type="email" name="email" />
                            </FormGroup>
                            <FormGroup style={{ 
                                textAlign: 'left',
                                fontSize: 14,
                                // fontWeight: 'bold'
                            }}>
                                <Label className="label-auth">Password</Label>
                                <Input onChange={ this.handleLogin } value={ this.state.password } type="password" name="password" />
                            </FormGroup>
                            <Button type="submit" style={{backgroundColor: '#9D3862', width:'100%', color: 'white'}}>Sign In</Button>
                        </Form>
                    </Col>
                    <Col sm="3" />
                </Row>
            </Container>
        );
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return bindActionCreators({ login }, dispatch)
}

export default connect( null, mapDispatchToProps )( LoginPage )
