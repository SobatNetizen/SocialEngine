import React, { Component } from 'react';
import FbChart from './socialsource/FbChart';
import TwitterChart from './socialsource/TwitterChart';
import NewsChart from './socialsource/NewsChart';

class SentimentAnalysist extends Component {
    render() {
        return (
            <div className="social-wrap">
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