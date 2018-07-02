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
            },
            data: [
                ['North Kalimantan',      2761477],
                ['Lampung',     1324110],
                ['Central Java',    959574],
                ['Banten',     907563],
                ['South Kalimantan',   655875],
                ['Riau Island',     607906],
                ['Gorontalo',   380181],
                ['West Sulawesi',  371282],
                ['West Kalimantan', 67370],
                ['West Papua',     52192],
                ['Jambi',  38262]
            ]
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
        return (
            <Chart chartType="GeoChart"
                width={"100%"}
                height={430}
                rows={this.state.data}
                columns={columns}
                options={this.state.option}
                graph_id="GeoChart"
                mapsApiKey="AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY"
                legend_toggle/>
        );
    }
}

export default RegionChart;