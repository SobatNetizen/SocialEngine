import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class GenderChart extends Component {
    constructor (props) {
        super(props)
        this.state = {
            data: [
                {name: 'male', value: 3254},
                {name: 'female', value: 1250},
                {name: 'unknown', value: 75},
            ]
        }
    }

    percentage = (value) => {
        let sum = this.state.data[0].value + this.state.data[1].value + this.state.data[2].value
        return Math.round((value/sum)*100) + ' %'
    }

	render () {
  	return (
        <div className="BarChart">
            <ul>
                <li className="bga">
                    <div className="imgGender">
                        <img src={require('../assets/img/standing-up-man-.png')} />
                    </div>
                    <h1>{ this.percentage(this.state.data[0].value)}</h1>
                    <p>{this.state.data[0].value}</p>
                    <h3>Male</h3>
                </li>
                <li className="bgb">
                    <div className="imgGender">
                        <img src={require('../assets/img/woman-standing-up.png')} />
                    </div>
                    <h1>{ this.percentage(this.state.data[1].value)}</h1>
                    <p>{this.state.data[1].value}</p>
                    <h3>Female</h3>
                </li>
                <li className="bgc">
                    <div className="imgGender">
                        <img src={require('../assets/img/standing-up-man-.png')} />
                    </div>
                    <h1>{ this.percentage(this.state.data[2].value)}</h1>
                    <p>{this.state.data[2].value}</p>
                    <h3>Unknown</h3>
                </li>
                <div className="clear"></div>
            </ul>
        </div>
    );
  }
}

export default GenderChart
