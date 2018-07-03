import React, { Component } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const dataFB = [
    {name: 'Positif', value: 150},
    {name: 'Neutral', value: 85},
    {name: 'Negatif', value: 75}
];
const COLORS = ['#6cb4ce', '#a5a5a5', '#c45d5d'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
}

class FbChart extends Component {
    render() {
        return (
            <div>
                <PieChart width={150} height={180} onMouseEnter={this.onPieEnter}>
                  <Pie
                  data={dataFB}
                  cx={65}
                  cy={75}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  >
                    {
                      dataFB.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
                    }
                  </Pie>
                </PieChart>
                <div className="detailSentimen">
                  <p>Local</p>
                  <h1>356</h1>
                  <img width="30" src="https://vignette.wikia.nocookie.net/simpsons/images/1/11/Twitter_bird_icon.png/revision/latest?cb=20111228065136" />
                </div>
                <div className="clear"></div>
            </div>
        );
    }
}

export default FbChart;
