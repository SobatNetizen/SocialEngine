import React, { Component } from 'react';
import { Chart } from 'react-google-charts';


class RegionChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            option: {
                region: 'ID',
                // resolution: 'province',
                displayMode: 'markers',
                colorAxis: { colors: ['orange', 'red'] },
                enableRegionInteractivity: 'true',
                backgroundColor: '#BBD1DF',
                datalessRegionColor: '#93bf6e',
                backgroundColorStroke: 'green',
                sizeAxis: {minValue: 5, maxSzie: 40},
            }
        }
    }
    render() {
        const columns = [
            {
                "type": "string",
                "label": "Region"
            },
            {
                "type": "number",
                "label": "Value"
            }
        ]
        // console.log('props region ==>', this.props.regionchart)
        return (
            <Chart chartType="GeoChart"
                width={"100%"}
                height={430}
                rows={this.props.regionchart}
                columns={columns}
                options={this.state.option}
                graph_id="GeoChart"
                mapsApiKey="AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY"
                legend_toggle/>
        );
    }
}

export default RegionChart;