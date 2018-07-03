import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class AgeChart extends Component {
    constructor (props) {
        super(props)
        this.state = 
        {
            kuy: [
                {name: '< 20', Male: this.props.agechart[0].Male, Female: 0, Unknown: 0},
                {name: '< 30', Male: 1, Female: 0, Unknown: 0},
                {name: '< 40', Male: 0, Female: 0, Unknown: 0},
                {name: '< 50', Male: 0, Female: 0, Unknown: 0},
                {name: '> 50', Male: 0, Female: 0, Unknown: 0},
                {name: 'Unknown', Male: 7, Female: 5, Unknown: 7},
            ],
            testing: this.props.agechart
        }
    }
    // componentWillMount(){
    //     this.setState({
    //         kuy: this.props.agechart
    //     })
    // }
	render () {
        console.log('XXXX', this.props.agechart)
  	return (
        
        <div className="BarChart">
            <BarChart width={680} height={370} data={this.state.kuy}
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

