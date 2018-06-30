import React, { Component } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const dataFB = [
    {name: 'Positif', value: 150},
    {name: 'Neutral', value: 150},
    {name: 'Negatif', value: 75}
];
const COLORS = ['#3D59B3', '#254196'];
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

class NewsChart extends Component {
    render() {
        return (
            <div>
                <PieChart width={120} height={200} onMouseEnter={this.onPieEnter}>
                    <Pie
                    data={dataFB} 
                    cx={50} 
                    cy={100} 
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={50} 
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

export default NewsChart;