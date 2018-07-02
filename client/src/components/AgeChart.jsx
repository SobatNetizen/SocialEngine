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
            <BarChart width={680} height={400} data={this.state.data}
                margin={{top: 10, right: 30, left: 10, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend />
                <Bar dataKey="Male" fill="#6cb4ce" />
                <Bar dataKey="Female" fill="#c45d5d" />
                <Bar dataKey="Unknown" fill="#a5a5a5" />
            </BarChart>
        </div>
    );
  }
}

export default AgeChart

