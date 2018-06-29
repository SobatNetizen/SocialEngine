import React, { Component } from 'react';
import { Container, Row, Col, CardImg } from 'reactstrap';

class ProfilePage extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col sm="12" style={{ 
                        backgroundColor: '#fff',
                        marginTop: 30,
                        borderRadius: 10 
                    }}>
                        <Col sm="3">
                            <h3 style={{ 
                                fontWeight: 'bold',
                                marginTop: 20,
                                marginBottom: 20
                             }}>Fill Your Profile :</h3>
                            <CardImg width="200" height="200" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/1024px-Placeholder_no_text.svg.png" alt="Generic placeholder image" />
                        </Col>
                        <Col sm="6">
                        </Col>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ProfilePage;