import React, { Component } from 'react';
import ChartGoogleTrend from '../components/ChartGoogleTrend';
import SentimentAnalyst from '../components/SentimentAnalysist';

class AnalyticPage extends Component {
    render() {
        return (
            <div>
                <h1>Analytic Page</h1>
                <ChartGoogleTrend />
                <SentimentAnalyst />
            </div>
        );
    }
}

export default AnalyticPage;