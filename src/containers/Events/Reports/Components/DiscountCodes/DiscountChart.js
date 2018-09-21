import React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import {data } from '../../../../Dashboard/components/data/data1'

class DiscountChart extends React.Component {

    render() {
        return (
              <ResponsiveContainer width="100%" height={120}>
                  <BarChart data={data}>
                    <XAxis dataKey="name"  />
                    <YAxis/>
                    <Bar fill="#8884d8" dataKey="pv" />
                    <Bar dataKey="uv" fill="#3f51b5"/>
                  </BarChart>
              </ResponsiveContainer>
        );
    }
}

export default DiscountChart;
