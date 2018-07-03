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
        let sum = this.props.genderchart[0].value + this.props.genderchart[1].value + this.props.genderchart[2].value
        return Math.round((value/sum)*100) + ' %'
    }

	render () {
        const {
            genderchart
        } = this.props
  	return (
        <div className="BarChart">
            <ul>
                <li className="bga">
                    <div className="imgGender">
                        <img src={require('../assets/img/standing-up-man-.png')} />
                    </div>
                    <h1>{ this.percentage(genderchart[0].value)}</h1>
                    <p>{genderchart[0].value}</p>
                    <h3>Male</h3>
                </li>
                <li className="bgb">
                    <div className="imgGender">
                        <img src={require('../assets/img/woman-standing-up.png')} />
                    </div>
                    <h1>{ this.percentage(genderchart[1].value)}</h1>
                    <p>{genderchart[1].value}</p>
                    <h3>Female</h3>
                </li>
                <li className="bgc">
                    <div className="imgGender">
                        <img src={require('../assets/img/standing-up-man-.png')} />
                    </div>
                    <h1>{ this.percentage(genderchart[2].value)}</h1>
                    <p>{genderchart[2].value}</p>
                    <h3>Unknown</h3>
                </li>
                <div className="clear"></div>
            </ul>
        </div>
    );
  }
}

export default GenderChart
