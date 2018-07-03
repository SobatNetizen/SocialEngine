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

import axios from 'axios'

// demography
import AgeChart from '../components/AgeChart';
import GenderChart from '../components/GenderChart';

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            googleChartLine : null,
            queryChart: null,
            queryTag: null,
            regionChart: null,
            sentimenTwitterChart: null,
            sentimenFacebookChart: null,
            sentimenNewsChart: null,
            genderChart: null,
        }
    }
    componentDidMount () {
        this.props.getUser()
    }

    componentWillMount () {
        axios.get(`http://localhost:3001/users/history/5b3a0ed0def5fa09fc5bf707`)
          .then(response => {
            //   let key = 
              console.log(response.data.history)
              this.setState({googleChartLine: [{ id: response.data.history.keyword, color: '#ccc', data: response.data.history.result[3].google[0][0].data }]})
            //   console.log('Data Google Chart Line', response.data.history.result[3].google[0][0].data)
            //  
            let dtquery = response.data.history.result[3].google[2].topList
              let newDtQuery = []
              for (let i = 0; i < dtquery.length; i++) {
                let newObj = {
                    value: dtquery[i].query,
                    count: dtquery[i].value
                }
                newDtQuery.push(newObj)
              }
              this.setState({queryChart: newDtQuery})

              let dtTag = response.data.history.result[3].google[3].topList
              let newDtTag = []
              for (let i = 0; i < dtTag.length; i++) {
                let newObj = {
                    value: dtTag[i].topic.title,
                    count: dtTag[i].value
                }
                newDtTag.push(newObj)
                
              }
              this.setState({queryTag: newDtTag})
            //   console.log('Data Query Chart', response.data.history.result[3].google[2].topList)
            //   console.log('Data Tag Chart', response.data.history.result[3].google[3].topList)
            //   console.log('Data Region Chart', response.data.history.result[3].google[1])

              // twitter process sentimen
              let positifTwitter = response.data.history.result[0].twitter[0].length
              let neutralTwitter = response.data.history.result[0].twitter[1].length
              let negatifTwitter = response.data.history.result[0].twitter[2].length
              let allTwitter = positifTwitter + neutralTwitter + negatifTwitter
            //   console.log('Data Sentimen Twitter', `Pos-${positifTwitter}, Neu-${neutralTwitter}, Neg-${negatifTwitter}, SUM(${allTwitter})`)
              let newObjTwitter = [
                  { name: 'Positif', value: positifTwitter },
                  { name: 'Neutral', value: neutralTwitter },
                  { name: 'Negatif', value: negatifTwitter }
              ]
              this.setState({sentimenTwitterChart: newObjTwitter})

              // facebook process Sentimen
              let positifFacebook = response.data.history.result[1].facebook[0].length
              let neutralFacebook = response.data.history.result[1].facebook[1].length
              let negatifFacebook = response.data.history.result[1].facebook[2].length
              let allFacebook = positifFacebook + neutralFacebook + negatifFacebook
            //   console.log('Data Sentimen Twitter', `Pos-${positifFacebook}, Neu-${neutralFacebook}, Neg-${negatifFacebook}, SUM(${allFacebook})`)
              let newObjFacebook = [
                { name: 'Positif', value: positifFacebook },
                { name: 'Neutral', value: neutralFacebook },
                { name: 'Negatif', value: negatifFacebook }
              ]
              this.setState({sentimenFacebookChart: newObjFacebook})

              //news process Sentimen
              let positifNews = response.data.history.result[2].news[0].length
              let neutralNews = response.data.history.result[2].news[1].length
              let negatifNews = response.data.history.result[2].news[2].length
              let allNews = positifNews + neutralNews + negatifNews
            //   console.log('Data Sentimen News', `Pos-${positifNews}, Neu-${neutralNews}, Neg-${negatifNews}, SUM(${allNews})`)
              let newObjNews = [
                { name: 'Positif', value: positifNews },
                { name: 'Neutral', value: neutralNews },
                { name: 'Negatif', value: negatifNews }
              ]
              this.setState({sentimenNewsChart: newObjNews})

              // region chart
              this.setState({regionChart: response.data.history.result[3].google[1]})

              // proses gender chart
              let negatifFB = response.data.history.result[1].facebook[0]
              let positifFB = response.data.history.result[1].facebook[1]
              let neutralFB = response.data.history.result[1].facebook[2]
              let maleCount = 0;
              let femaleCount = 0;
              let unknownCount = 0;
              function pushToArray(value) {
                for (let i = 0; i < value.length; i++) {
                    if (value[i].detail.gender == 'Male') {
                        maleCount++
                    } else if (value[i].detail.gender == 'Female') {
                        femaleCount++
                    } else {
                        unknownCount++
                    }
                }
              }
              pushToArray(negatifFB)
              pushToArray(positifFB)
              pushToArray(neutralFB)


              let objGender = [
                  {name: 'male', value: maleCount },
                  {name: 'female', value: femaleCount },
                  {name: 'unknown', value: unknownCount }
              ]
              this.setState({genderChart: objGender})
              
              console.log('negatif FB ===', negatifFB)

          })
          .catch(err => {
              console.log(err)
          })
    }

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
                                {
                                    (this.state.googleChartLine) ? 
                                    <ChartGoogleTrend chartline={this.state.googleChartLine} />
                                    :
                                    <img src={require('../assets/image/loading_icon.gif')}/>
                                }
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
                                {
                                    (this.state.queryChart) ?
                                    <QueryChart chartquery={this.state.queryChart} />
                                    :
                                    <img src={require('../assets/image/loading_icon.gif')}/>
                                }
                                
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
                                {
                                    this.state.queryTag ?
                                    <TagChart querytag={this.state.queryTag} />
                                    :
                                    <img src={require('../assets/image/loading_icon.gif')}/>
                                }
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
                                {
                                    (this.state.regionChart) ?
                                    <RegionChart regionchart={this.state.regionChart} />
                                    :
                                    <img src={require('../assets/image/loading_icon.gif')}/>
                                }
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
                                    {
                                        this.state.sentimenTwitterChart ?
                                        <TwitterChart twitterchart={this.state.sentimenTwitterChart} />
                                        :
                                        <img src={require('../assets/image/loading_icon.gif')}/>
                                    }
                                    
                                  </Col>
                                  <Col sm="4" className="sentimenChart">
                                    {
                                        this.state.sentimenNewsChart ?
                                        <NewsChart newschart={this.state.sentimenNewsChart} />
                                        :
                                        <img src={require('../assets/image/loading_icon.gif')}/>
                                    }
                                  </Col>
                                  <Col sm="4" className="sentimenChart">
                                    {
                                        this.state.sentimenFacebookChart ?
                                        <FbChart facebookchart={this.state.sentimenFacebookChart} />
                                        :
                                        <img src={require('../assets/image/loading_icon.gif')}/>
                                    }
                                    
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
                                {
                                    this.state.genderChart ?
                                    <GenderChart genderchart={this.state.genderChart} />
                                    :
                                    <img src={require('../assets/image/loading_icon.gif')}/>
                                }
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
