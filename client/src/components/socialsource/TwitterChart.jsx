import React, { Component } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const dataFB = [
    {name: 'Positif', value: 150},
    {name: 'Neutral', value: 85},
    {name: 'Negatif', value: 75}
];
const COLORS = ['blue', 'grey', 'green'];
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
                    cy={83} 
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={60} 
                    fill="#8884d8"
                    >
                        {
                        dataFB.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                    }
                    </Pie>
                </PieChart>
                {/* <div id="faceboook"></div>
                <div id="twitter"></div>
                <div id="blog"></div>
                <div id="detik"></div> */}
            </div>
        );
    }
}

export default FbChart;