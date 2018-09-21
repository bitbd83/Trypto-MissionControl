import React, { Component } from 'react'
import { data1} from '../../../Dashboard/components/data/data2'
import {data, data2 } from '../../../Dashboard/components/data/data1'
import ChartCard from 'components/dashboard/Common/ChartCard';
import {connect} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  CartesianGrid,

} from 'recharts';

class SummaryChart extends Component {

  getGraphData = (Data) => {
    const data = [];
    let totalTickets = 0;
    Data.layout.xAxis.intervals.map((x, i)=> {
      data.push({xAxis:x})
      Data.series.map((ticket, index)=> {
        data[i][ticket.title] = ticket.data[i].yAxisValue
        totalTickets += ticket.data[i].yAxisValue
      })
    })
    return {data, totalTickets};
  }

  getBarCharts = (data) => {
    return data.series.map((ticket, index)=> {
      return <Bar fill="white" dataKey={ticket.title} />
    })
  }

  render(){
    const { ticketGraph, isFetchingTicketGraph } = this.props;

    let chartData = [];
    let chartBars = '';
    if(Object.keys(ticketGraph).length){
      chartData = this.getGraphData(ticketGraph.chartData)
      chartBars = this.getBarCharts(ticketGraph.chartData)
    }
    return(
      <div className="row">
          <div className="col-lg-4 col-sm-6 col-12">
            {!isFetchingTicketGraph ? <ChartCard styleName="bg-secondary text-white">
              <div className="chart-title">
                <h2>{chartData.totalTickets}</h2>
                <p>Tickets</p>
              </div>
                <ResponsiveContainer width="100%" height={110}>
                <BarChart data={chartData.data}>
                  <Bar dataKey="xAxis" fill="white"/>
                  {chartBars}
                </BarChart>
              </ResponsiveContainer>
            </ChartCard> : <div className="d-flex h-100 justify-content-center align-items-center"><CircularProgress/></div>}
          </div>

          <div className="col-lg-4 col-sm-6 col-12">
            <ChartCard styleName="bg-teal lighten-1 text-white">
              <div className="chart-title">
                <h2>1.4K</h2>
                <p>Visits</p>
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
          <div className="col-lg-4 col-sm-6 col-12">
            <ChartCard styleName="bg-blue text-white">
              <div className="chart-title">
                <h2>$23,000</h2>
                <p>Earned</p>
              </div>

              <ResponsiveContainer width="100%" height={110}>
                <LineChart data={data1}>
                  <Line dataKey="uv" stroke="#ffffff" activeDot={{r: 8}}/>
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>
    )
  }
}

const mapStateToProps = ({createanevent, tenants, eventreports }) => {
  return {
    tenantsByDomain: tenants.tenantsByDomain,
    isFetchingTicketGraph: eventreports.get('isFetchingTicketGraph'),
    tenantsByDomain: tenants.tenantsByDomain,
    ticketGraph: eventreports.get('ticketGraph').toJS(),
  };
}

export default connect(mapStateToProps)(SummaryChart);
