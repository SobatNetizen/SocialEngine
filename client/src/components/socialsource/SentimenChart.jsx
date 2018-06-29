import React, { Component } from 'react';
import { PieChart, Pie, Cell } from 'recharts'

const dataSentimen =  [
    {name: 'Good', value: 400}, 
    {name: 'Neutral', value: 300},
    {name: 'Bad', value: 300}
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
// const RADIAN = Math.PI / 180;     

class SentimenChart extends Component {
    render() {
        return (
            <PieChart width={800} height={90} onMouseEnter={this.onPieEnter}>
            <Pie
              data={dataSentimen} 
              cx={100} 
              cy={100} 
              startAngle={180}
              endAngle={0}
              innerRadius={70}
              outerRadius={100} 
              fill="#8884d8"
              paddingAngle={5}
            >
                {
                  dataSentimen.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
              }
            </Pie>
          </PieChart>
        );
    }
}

export default SentimenChart;