import React, { Component } from 'react';
import { Container, Row, Col, 
    Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from '../store/user/login.action'
// import axios from 'axios';
// import swal from 'sweetalert';

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
        let self = this
        let email = self.state.email
        let password = self.state.password
        axios.post('http://localhost:3001/users/login',{ email, password })
        .then(result => {
            localStorage.setItem('token', result.headers.token)
            swal('success', result.data.message, 'success')
            this.props.history.push({ pathname: '/home' })
        })
        .catch(err =>{
            swal('info', 
            err.message==='Request failed with status code 400' ?
            'Tolong isi kolom email dan password' : err.message
            , 'info')
        })
    }

    render() {
        const token = localStorage.getItem('token')
        if(token){
            this.props.history.push({ pathname: '/home' })
        }
        return (
            <Container>
                <Row>
                    <Col sm="3" />
                    <Col sm="6" style={{
                        marginTop: 50,
                        backgroundColor: '#fff',
                        padding: 30,
                        borderRadius: 10
                    }}>
                        <h3 style={{ marginBottom: 50 }}>Welcome Sobat Netizen</h3>
                        <Form onSubmit={ this.handleSubmit }>
                            <FormGroup style={{ 
                                textAlign: 'left',
                                fontWeight: 'bold'
                            }}>
                                <Label>Username :</Label>
                                <Input onChange={ this.handleLogin } value={ this.state.email } type="email" name="email" placeholder="input email" />
                            </FormGroup>
                            <FormGroup style={{ 
                                textAlign: 'left',
                                fontWeight: 'bold'
                            }}>
                                <Label>Password :</Label>
                                <Input onChange={ this.handleLogin } value={ this.state.password } type="password" name="password" placeholder="input password" />
                            </FormGroup>
                            <Button type="submit" color="info">Login</Button>
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
