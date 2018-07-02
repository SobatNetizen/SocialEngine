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
        return Math.round((value/sum)*100) + '%'
    }

	render () {
  	return (
        <div className="BarChart">
            <ul>
                <li className="bga">
                    <div className="imgGender">
                        <img src={require('../assets/img/standing-up-man-.png')} />
                    </div>
                    <h3>Male</h3>
                    {/* <h3>{ this.percentage(this.state.data[0].value)}</h3>
                    <p>{this.state.data[0].value}</p> */}
                </li>
                <li className="bgb">
                    <div className="imgGender">
                        <img src={require('../assets/img/woman-standing-up.png')} />
                    </div>
                    <h3>Female</h3>
                    {/* <h3>{this.percentage(this.state.data[1].value)}</h3>
                    <p>{this.state.data[1].value}</p> */}
                </li>
                <li className="bgc">
                    <div className="imgGender">
                        <img src={require('../assets/img/standing-up-man-.png')} />
                    </div>
                    <h3>Unknown</h3>
                    {/* <h3>{this.percentage(this.state.data[2].value)}</h3>
                    <p>{this.state.data[2].value}</p> */}
                </li>
                <div className="clear"></div>
            </ul>
        </div>
    );
  }
}

export default GenderChart

