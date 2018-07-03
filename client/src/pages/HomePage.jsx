import React, { Component } from 'react';
import { Container, Row, Col,
    Card, CardBody, CardTitle
} from 'reactstrap';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUser } from '../store/user/getUser.action'

import ChartGoogleTrend from '../components/ChartGoogleTrend';
import SocialChart from '../components/SentimentAnalysist';
import RegionChart from '../components/RegionChart';
import TagChart from '../components/TagChart';
import QueryChart from '../components/QueryChart';

// social chart
import FbChart from '../components/socialsource/FbChart';
import TwitterChart from '../components/socialsource/TwitterChart';
import NewsChart from '../components/socialsource/NewsChart';

// demography
import AgeChart from '../components/AgeChart';
import GenderChart from '../components/GenderChart';

class HomePage extends Component {
    componentDidMount () {
        // this.props.getUser()
    }

    // componentDidMount () {
    //     this.props.getHistory()
    //     console.log('did')
    // }

    render() {
        const token = localStorage.getItem('token')
        if(token===null){
            this.props.history.push({ pathname: '/' })
        }
        return (
            <Container fluid style={{ marginTop: 70, marginBottom: 60 }}>
                <Row style={{ marginBottom: 15 }}>
                    <Col sm="12">
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
                </Row>

                <Row style={{ marginBottom: 15 }}>
                    <Col sm="5">
                        <Card style={{ marginBottom: 15, maxHeight: 255, minHeight: 255 }}>
                            <Row>
                                <Col sm="12" style={{ paddingTop: 20, paddingLeft: 30, paddingRight: 30}}>
                                    <CardTitle
                                        style={{
                                        textAlign: 'left',
                                        width: '50%',
                                        fontSize: 12,
                                        float: 'left',
                                        fontWeight: 'bold' }}>
                                        Query Chart</CardTitle>
                                    <CardTitle style={{
                                        textAlign: 'right',
                                        width: '50%',
                                        fontSize: 12,
                                        float: 'right',
                                        fontWeight: 'bold' }}>25 MAR : 30 MAY</CardTitle>
                                </Col>
                            </Row>
                            <CardBody style={{ paddingTop: 0, marginTop: 10  }}>
                                <QueryChart />
                            </CardBody>
                        </Card>
                        <Card tyle={{ maxHeight: 255, minHeight: 255 }}>
                            <Row>
                                <Col sm="12" style={{ paddingTop: 20, paddingLeft: 30, paddingRight: 30 }}>
                                    <CardTitle
                                        style={{
                                        textAlign: 'left',
                                        width: '50%',
                                        fontSize: 12,
                                        float: 'left',
                                        fontWeight: 'bold' }}>
                                        Tag Chart</CardTitle>
                                    <CardTitle style={{
                                        textAlign: 'right',
                                        width: '50%',
                                        fontSize: 12,
                                        float: 'right',
                                        fontWeight: 'bold' }}>25 MAR : 30 MAY</CardTitle>
                                </Col>
                            </Row>
                            <CardBody style={{ paddingTop: 0, marginTop: 10 }}>
                                <TagChart />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="7" style={{ marginLeft: -15, marginTop: -50, paddingRight: 0, maxHeight: 450, minHeight: 450 }}>
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
                            <CardBody style={{ paddingTop: 0, paddingRight: 15 }}>
                                <RegionChart />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row style={{ marginTop: 15 }}>
                    <Col sm="5">
                        <Card style={{ marginBottom: 15}}>
                            <Row>
                                <Col sm="12" style={{ paddingTop: 20, paddingLeft: 30, paddingRight: 30 }}>
                                    <CardTitle
                                        style={{
                                        textAlign: 'left',
                                        width: '50%',
                                        fontSize: 12,
                                        float: 'left',
                                        fontWeight: 'bold' }}>
                                        Sentimen Analyist</CardTitle>
                                    <CardTitle style={{
                                        textAlign: 'right',
                                        width: '50%',
                                        fontSize: 12,
                                        float: 'right',
                                        fontWeight: 'bold' }}>25 MAR : 30 MAY</CardTitle>
                                </Col>
                            </Row>
                            <CardBody style={{ paddingTop: 0 }}>
                              <Col sm="12" >
                                <Row className="RowSentimen">
                                  <Col sm="4" className="sentimenChart">
                                    <TwitterChart />
                                  </Col>
                                  <Col sm="4" className="sentimenChart">
                                    <NewsChart />
                                  </Col>
                                  <Col sm="4" className="sentimenChart">
                                    <FbChart />
                                  </Col>
                                </Row>
                              </Col>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="7"  style={{ marginLeft: -15, marginTop: -30, paddingRight: 0, maxHeight: 450, minHeight: 450 }}>
                        <Card style={{ marginBottom: 15 }}>
                            <Row>
                                <Col sm="12" style={{ paddingTop: 20, paddingLeft: 30, paddingRight: 30 }}>
                                    <CardTitle
                                        style={{
                                        textAlign: 'left',
                                        width: '50%',
                                        fontSize: 12,
                                        float: 'left',
                                        fontWeight: 'bold' }}>
                                        Age Chart</CardTitle>
                                    <CardTitle style={{
                                        textAlign: 'right',
                                        width: '50%',
                                        fontSize: 12,
                                        float: 'right',
                                        fontWeight: 'bold' }}>25 MAR : 30 MAY</CardTitle>
                                </Col>
                            </Row>
                            <CardBody style={{ paddingTop: 0 }}>
                                <AgeChart />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
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
                                        Gender Chart</CardTitle>
                                    <CardTitle style={{
                                        textAlign: 'right',
                                        width: '50%',
                                        fontSize: 12,
                                        float: 'right',
                                        fontWeight: 'bold' }}>25 MAR : 30 MAY</CardTitle>
                                </Col>
                            </Row>
                            <CardBody style={{ paddingTop: 0 }}>
                                <GenderChart />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return bindActionCreators({ getUser }, dispatch)
}

export default connect( null, mapDispatchToProps )( HomePage )
