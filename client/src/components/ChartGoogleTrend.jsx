import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line';
import dataJSON from './googletrend.json'

class ChartGoogleTrend extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log('===>', this.props)
        return (
            <div className="googleTrendChart">
                <ResponsiveLine
                    data={this.props.chartline}
                    margin={{
                        "top": 20,
                        "right": 10,
                        "bottom": 80,
                        "left": 60
                    }}
                    minY="auto"
                    stacked={true}
                    axisBottom={{
                        "orient": "bottom",
                        "tickSize": 5,
                        "tickPadding": 5,
                        "tickRotation": -35,
                        "legend": "DATE",
                        "legendOffset": 80,
                        "legendPosition": "center"
                    }}
                    axisLeft={{
                        "orient": "left",
                        "tickSize": 5,
                        "tickPadding": 5,
                        "tickRotation": 0,
                        "legend": "VALUE",
                        "legendOffset": -40,
                        "legendPosition": "center"
                    }}
                    colors="d320"
                    dotSize={7}
                    dotColor="inherit:darker(0.3)"
                    dotBorderWidth={2}
                    dotBorderColor="#ffffff"
                    enableDotLabel={false}
                    dotLabel="y"
                    dotLabelYOffset={-12}
                    enableArea={true}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                    // legends={[
                    //     {
                    //         "anchor": "bottom-right",
                    //         "direction": "column",
                    //         "translateX": 100,
                    //         "itemWidth": 80,
                    //         "itemHeight": 20,
                    //         "symbolSize": 12,
                    //         "symbolShape": "circle"
                    //     }
                    // ]}
                />
            </div>
        );
    }
}

export default ChartGoogleTrend;