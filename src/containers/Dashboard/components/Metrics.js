import React from 'react';
import { data1} from './data/data2'
import {data, data2 } from './data/data1'
import ChartCard from 'components/dashboard/Common/ChartCard';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    Line,
    LineChart,
    ResponsiveContainer,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

class Metrics extends React.Component {

    render() {
        return (
            <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                    <ChartCard styleName="bg-secondary text-white">
                        <div className="chart-title">
                            <h2>250</h2>
                            <p>Orders This Month</p>
                        </div>

                        <ResponsiveContainer width="100%" height={110}>
                            <BarChart data={data}>
                                <Bar dataKey="pv" fill="white"/>
                                <Bar dataKey="uv" fill="white"/>
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                    <ChartCard styleName="bg-primary text-white">
                        <div className="chart-title">
                            <h2>$7,890</h2>
                            <p>Sales This Month</p>
                        </div>

                        <ResponsiveContainer width="100%" height={110}>
                            <AreaChart data={data1} margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                                <Area type="monotone" dataKey="pv" stroke="rgba(255,255,255,0.5)"
                                        activeDot={{r: 8}}
                                        fillOpacity={.5}
                                        fill="white"/>
                            </AreaChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                    <ChartCard styleName="bg-teal lighten-1 text-white">
                        <div className="chart-title">
                            <h2>2.6K</h2>
                            <p>Visitors</p>
                        </div>
                        <ResponsiveContainer width="100%" height={110}>
                            <LineChart data={data2}>
                                <Line type="monotone" dataKey="uv" stroke="#ffffff" activeDot={{r: 8}}/>
                                <Line type="monotone" dataKey="pv" stroke="#ffffff"/>
                                <Line type="monotone" dataKey="amt" stroke="#ffffff"/>
                            </LineChart>
                        </ResponsiveContainer>

                    </ChartCard>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                    <ChartCard styleName="bg-blue text-white">
                        <div className="chart-title">
                            <h2>$87,345</h2>
                            <p>Yearly Sales</p>
                        </div>

                        <ResponsiveContainer width="100%" height={110}>
                            <LineChart data={data1}>
                                <Line dataKey="uv" stroke="#ffffff" activeDot={{r: 8}}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>
            </div>
        );
    }
}

export default Metrics;