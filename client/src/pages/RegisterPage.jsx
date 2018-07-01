import React, { Component } from 'react';
import { Container, Row, Col, 
    Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import axios from 'axios';
import swal from 'sweetalert';

class RegisterPage extends Component {

    constructor(){
        super()
        this.state = {
            companyname: '',
            email: '',
            password: ''
        }
    }

    handleRegister = (event) => {
        event.preventDefault()
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let self = this
        let companyname = self.state.companyname
        let email = self.state.email
        let password = self.state.password
        axios.post('http://localhost:3001/users/register',{ companyname, email, password })
        .then(result => {
            localStorage.setItem('token', result.headers.token)
            swal('success', result.data.message, 'success')
            this.props.history.push({ pathname: '/home' })
        })
        .catch(err =>{
            swal('info', 
            err.message=='Request failed with status code 400' ?
            'Tolong isi kolom perusahaan, email dan password' : err.message
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
                        <h3 style={{ marginBottom: 50 }}>Regiter Sobat Netizen</h3>
                        <Form onSubmit={ this.handleSubmit }>
                            <FormGroup style={{ 
                                textAlign: 'left',
                                fontWeight: 'bold' 
                            }}>
                                <Label>Company Name :</Label>
                                <Input onChange={ this.handleRegister } value={ this.state.companyname } type="text" name="companyname" placeholder="input company name" />
                            </FormGroup>
                            <FormGroup style={{ 
                                textAlign: 'left',
                                fontWeight: 'bold' 
                            }}>
                                <Label>Username or Email :</Label>
                                <Input onChange={ this.handleRegister } value={ this.state.email } type="email" name="email" placeholder="input email" />
                            </FormGroup>
                            <FormGroup style={{ 
                                textAlign: 'left',
                                fontWeight: 'bold'
                            }}>
                                <Label>Password :</Label>
                                <Input onChange={ this.handleRegister } value={ this.state.password } type="password" name="password" placeholder="input password" />
                            </FormGroup>
                            <Button color="info" type="submit">Register</Button>
                        </Form>
                    </Col>
                    <Col sm="3" />
                </Row>
            </Container>
        );
    }
}

export default RegisterPage;