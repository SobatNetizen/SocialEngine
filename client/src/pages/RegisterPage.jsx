import React, { Component } from 'react';
import { Container, Row, Col, 
    Button, Form, FormGroup, Label, Input,  } from 'reactstrap';
import { Link, } from 'react-router-dom';

import axios from 'axios';
import swal from 'sweetalert';
import '../assets/css/Dash.css';


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
            swal('Success', result.data.message, 'success')
            this.props.history.push({ pathname: '/dashboard' })
        })
        .catch(err =>{
            swal('Info', 
            err.message==='Request failed with status code 400' ?
            'Please fill up the required information' : err.message
            , 'info')
        })
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
                        <img className="img-logo-radar" src={require('../assets/image/radar-logo.jpg')} />
                    </Col>
                    <Col sm="5" style={{
                        // marginTop: 50,
                        backgroundColor: '#fff',
                        padding: 30,
                        borderRadius: 10
                    }}>
                        <h3 style={{ marginBottom: 50 }} className="h3-margin-0">Register Now !</h3>
                        <small>Already have an account? <Link to="/" className="color-maroon">Sign In</Link></small>
                        <div className="small-auth"></div>
                        <Form onSubmit={ this.handleSubmit }>
                            <FormGroup style={{ 
                                textAlign: 'left',
                                fontSize: 14,
                                // fontWeight: 'bold' 
                            }}>
                                <Label className="label-auth">Company Name</Label>
                                <Input onChange={ this.handleRegister } value={ this.state.companyname } type="text" name="companyname"  />
                            </FormGroup>
                            <FormGroup style={{ 
                                textAlign: 'left',
                                fontSize: 14,
                                // fontWeight: 'bold' 
                            }}>
                                <Label className="label-auth">Email</Label>
                                <Input onChange={ this.handleRegister } value={ this.state.email } type="email" name="email"  />
                            </FormGroup>
                            <FormGroup style={{ 
                                textAlign: 'left',
                                fontSize: 14,
                                // fontWeight: 'bold'
                            }}>
                                <Label className="label-auth">Password</Label>
                                <Input onChange={ this.handleRegister } value={ this.state.password } type="password" name="password"  />
                                <small><i>Password must consist alphanumeric with min. 8 characters</i></small>
                            </FormGroup>
                            <Button color="" type="submit" style={{backgroundColor: '#9D3862', width:'100%', color: 'white'}}>Register</Button>
                        </Form>
                    </Col>
                    <Col sm="3" />
                </Row>
            </Container>
        );
    }
}

export default RegisterPage;