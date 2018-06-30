import React, { Component } from 'react';
import { Container, Row, Col, 
    Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class RegisterPage extends Component {
    render() {
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

                            <FormGroup style={{ 
                                textAlign: 'left',
                                fontWeight: 'bold' 
                            }}>
                                <Label>Company Name :</Label>
                                <Input type="email" name="email" placeholder="input company name" />
                            </FormGroup>
                            <FormGroup style={{ 
                                textAlign: 'left',
                                fontWeight: 'bold' 
                            }}>
                                <Label>Username or Email :</Label>
                                <Input type="email" name="email" placeholder="input email" />
                            </FormGroup>
                            <FormGroup style={{ 
                                textAlign: 'left',
                                fontWeight: 'bold'
                            }}>
                                <Label>Password :</Label>
                                <Input type="password" name="password" placeholder="input password" />
                            </FormGroup>
                            <Button color="info">Register</Button>
                            
                    </Col>
                    <Col sm="3" />
                </Row>
            </Container>
        );
    }
}

export default RegisterPage;