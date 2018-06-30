import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

class NotFound extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Row style={{ marginBottom: '80px' }}>
                        <Col>
                            <h1 style={{ color: 'red' }}>"Not Found"</h1>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default NotFound