import React, { Component } from 'react';
import FbChart from './socialsource/FbChart';
import TwitterChart from './socialsource/TwitterChart';
import NewsChart from './socialsource/NewsChart';
import SentimenChart from './socialsource/SentimenChart';

class SentimentAnalysist extends Component {
    render() {
        return (
            <div className="social-wrap">
                <SentimenChart />
                <ul>
                    <li>
                        <FbChart />
                    </li>
                    <li>
                        <TwitterChart />
                    </li>
                    <li>
                        <NewsChart />
                    </li>
                    <div className="clear"></div>
                </ul>
            </div>
        );
    }
}

export default SentimentAnalysist;