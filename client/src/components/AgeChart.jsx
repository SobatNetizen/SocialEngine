import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class AgeChart extends Component {

	render () {
  	return (
        
        <div className="BarChart">
            <BarChart width={680} height={370} data={this.props.agechart}
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

