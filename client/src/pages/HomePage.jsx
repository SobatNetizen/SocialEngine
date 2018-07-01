import React, { Component } from 'react';
import { Container, Row, Col,
    Card, CardBody, CardTitle
} from 'reactstrap';

import ChartGoogleTrend from '../components/ChartGoogleTrend';
import SocialChart from '../components/SentimentAnalysist';
import SentimenChart from '../components/socialsource/SentimenChart';
import RegionChart from '../components/RegionChart';
import TagChart from '../components/TagChart';

class HomePage extends Component {
    render() {
        const token = localStorage.getItem('token')
        if(token==null){
            this.props.history.push({ pathname: '/' })
        }
        return (
            <Container fluid style={{ marginTop: 15, marginBottom: 60 }}>
                <Row style={{ marginBottom: 15 }}>
                    <Col sm="6">
                        <Card>
                            <Row>
                                <Col sm="12" style={{ paddingTop: 20, paddingLeft: 30, paddingRight: 30 }}>
                                    <CardTitle 
                                        style={{ 
                                        textAlign: 'left',
                                        width: '50%',
                                        fontSize: 12,
                                        float: 'left',
                                        fontWeight: 'bold' }}>
                                        Google Trends</CardTitle>
                                    <CardTitle style={{ 
                                        textAlign: 'right', 
                                        width: '50%',
                                        fontSize: 12,
                                        float: 'right',
                                        fontWeight: 'bold' }}>25 MAR : 30 MAY</CardTitle>
                                </Col>
                            </Row>
                            <CardBody style={{ paddingTop: 0 }}>
                                {/* <SocialChart /> */}
                                <ChartGoogleTrend />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="6">
                        <Card>
                            <Row>
                                <Col sm="12" style={{ paddingTop: 20, paddingLeft: 30, paddingRight: 30 }}>
                                    <CardTitle 
                                        style={{ 
                                        textAlign: 'left',
                                        width: '50%',
                                        fontSize: 12,
                                        float: 'left',
                                        fontWeight: 'bold' }}>
                                        NUMBER OF MENTION</CardTitle>
                                    <CardTitle style={{ 
                                        textAlign: 'right', 
                                        width: '50%',
                                        fontSize: 12,
                                        float: 'right',
                                        fontWeight: 'bold' }}>25 MAR : 30 MAY</CardTitle>
                                </Col>
                            </Row>
                            <CardBody style={{ paddingTop: 0 }}>
                                <SentimenChart />
                                <SocialChart />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                
                <Row>
                    <Col sm="6">
                        <Card>
                            <Row>
                                <Col sm="12" style={{ paddingTop: 20, paddingLeft: 30, paddingRight: 30 }}>
                                    <CardTitle 
                                        style={{ 
                                        textAlign: 'left',
                                        width: '50%',
                                        fontSize: 12,
                                        float: 'left',
                                        fontWeight: 'bold' }}>
                                        NUMBER OF MENTION</CardTitle>
                                    <CardTitle style={{ 
                                        textAlign: 'right', 
                                        width: '50%',
                                        fontSize: 12,
                                        float: 'right',
                                        fontWeight: 'bold' }}>25 MAR : 30 MAY</CardTitle>
                                </Col>
                            </Row>
                            <CardBody style={{ paddingTop: 0 }}>
                                <TagChart/>
                                {/* <TagCharts /> */}
                            </CardBody>
                        </Card>
                    </Col>
                    {/* <Col sm="3">
                        <Card>
                            <Row>
                                <Col sm="12" style={{ paddingTop: 20, paddingLeft: 30, paddingRight: 30 }}>
                                    <CardTitle 
                                        style={{ 
                                        textAlign: 'left',
                                        width: '50%',
                                        fontSize: 12,
                                        float: 'left',
                                        fontWeight: 'bold' }}>
                                        NUMBER OF MENTION</CardTitle>
                                    <CardTitle style={{ 
                                        textAlign: 'right', 
                                        width: '50%',
                                        fontSize: 12,
                                        float: 'right',
                                        fontWeight: 'bold' }}>25 MAR : 30 MAY</CardTitle>
                                </Col>
                            </Row>
                            <CardBody style={{ paddingTop: 0 }}>
                                
                            </CardBody>
                        </Card>
                    </Col> */}

                    <Col sm="6">
                        <Card>
                            <Row>
                                <Col sm="12" style={{ paddingTop: 20, paddingLeft: 30, paddingRight: 30 }}>
                                    <CardTitle 
                                        style={{ 
                                        textAlign: 'left',
                                        width: '50%',
                                        fontSize: 12,
                                        float: 'left',
                                        fontWeight: 'bold' }}>
                                        Region Chart</CardTitle>
                                    <CardTitle style={{ 
                                        textAlign: 'right', 
                                        width: '50%',
                                        fontSize: 12,
                                        float: 'right',
                                        fontWeight: 'bold' }}>25 MAR : 30 MAY</CardTitle>
                                </Col>
                            </Row>
                            <CardBody style={{ paddingTop: 0 }}>
                                <RegionChart />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default HomePage;