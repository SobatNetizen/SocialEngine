import React, { Component } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const dataFB = [
    {name: 'Positif', value: 453},
    {name: 'Neutral', value: 100},
    {name: 'Negatif', value: 250}
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
                    data={this.props.facebookchart}
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
                  <p>Global</p>
                  <h1>{this.props.facebookchart[0].value+this.props.facebookchart[1].value+this.props.facebookchart[2].value}</h1>
                  <div className="">
                    <img width="35" src="http://pngimg.com/uploads/facebook_logos/facebook_logos_PNG19753.png" />
                  </div>
                </div>
                <div className="clear"></div>
            </div>
        );
    }
}

export default FbChart;
