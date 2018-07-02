import React, { Component } from 'react';
import { PieChart, Pie, Cell } from 'recharts'

const dataSentimen =  [
    {name: 'Good', value: 15}, 
    {name: 'Neutral', value: 5},
    {name: 'Bad', value: 5}
];
const COLORS = ['blue', 'grey', 'green'];
const RADIAN = Math.PI / 180;

class SentimenChart extends Component {
    render() {
        return (
            <div className="sentimenChart">
                <PieChart width={300} height={130} onMouseEnter={this.onPieEnter}>
                    <Pie
                    data={dataSentimen} 
                    cx={140}
                    cy={150}
                    startAngle={180}
                    endAngle={0}
                    innerRadius={80}
                    outerRadius={120}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    >
                        {
                        dataSentimen.map((entry, index) => <Cell key={index} key={index} fill={COLORS[index % COLORS.length]}/>)
                        }
                    </Pie>
                </PieChart>
          </div>
        );
    }
}

export default SentimenChart;