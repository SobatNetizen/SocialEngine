import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class AgeChart extends Component {
    constructor (props) {
        super(props)
        this.state = {
            data: [
                {name: '< 20', Male: 75, Female: 25, Unknown: 5},
                {name: '< 30', Male: 35, Female: 15, Unknown: 50},
                {name: '< 40', Male: 25, Female: 10, Unknown: 65},
                {name: '< 50', Male: 60, Female: 8, Unknown: 32},
                {name: '> 50', Male: 45, Female: 13, Unknown: 42},
                {name: 'Unknown', Male: 45, Female: 13, Unknown: 42},
            ]
        }
    }
	render () {
  	return (
        <div className="BarChart">
            <BarChart width={700} height={300} data={this.state.data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend />
                <Bar dataKey="Male" fill="blue" />
                <Bar dataKey="Female" fill="red" />
                <Bar dataKey="Unknown" fill="grey" />
            </BarChart>
        </div>
    );
  }
}

export default AgeChart

