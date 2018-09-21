import React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip  } from 'recharts';
import {data } from '../../../../Dashboard/components/data/data1'
import { getRandomColor } from '../GetColors'

class HotelChart extends React.Component {

  getGraphData = (Data) => {
    const data = [];
    Data.layout.xAxis.intervals.map((x, i)=> {
      data.push({xAxis:x})
      Data.series.map((item, index)=> {
        data[i][item.title] = item.data[i].yAxisValue
      })
    })
    return data;
  }

  getBarCharts = (data) => {
    return data.series.map((item, index)=> {
      return <Bar fill={getRandomColor()} dataKey={item.title} />
    })
  }

    render() {

      const { graphData } = this.props;
      let chartData = [];
      let chartBars = '';
      if(Object.keys(graphData).length){
        chartData = this.getGraphData(graphData.chartData)
        chartBars = this.getBarCharts(graphData.chartData)
      }

        return (
            <ResponsiveContainer width="100%" height={120}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="1 1"/>
              <XAxis dataKey="xAxis"  />
              <YAxis/>
              <Tooltip/>
                {chartBars}
            </BarChart>
        </ResponsiveContainer>
        );
    }
}

export default HotelChart;
