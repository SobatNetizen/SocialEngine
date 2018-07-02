import React, { Component } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const dataFB = [
    {name: 'Positif', value: 150},
    {name: 'Neutral', value: 150},
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

class NewsChart extends Component {
    render() {
        return (
            <div>
                <PieChart width={150} height={180} onMouseEnter={this.onPieEnter}>
                    <Pie
                    data={dataFB}
                    cx={75} 
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
                  <h1>275</h1>
                  <div className="logo">
                    <img width="25" className="marginRightLogo" src="https://images-na.ssl-images-amazon.com/images/I/61OVLPJ14tL.png" />
                    <img width="25" className="marginRightLogo" src="http://www.4androidapk.net/data/programs/images/liputan6-berita-indonesia_3553.png" />
                    <img width="25" className="marginRightLogo" src="https://cdn1.iconfinder.com/data/icons/metro-ui-dock-icon-set--icons-by-dakirby/512/CNN.png" />
                  </div>
                </div>
                <div className="clear"></div>
            </div>
        );
    }
}

export default NewsChart;