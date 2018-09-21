import React from 'react';
import ContentLoader from "react-content-loader"
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

export default class EventLoader extends React.Component {
  render () {
    return (
      <Grid item xs={3} style={{height: '330px'}}>
        <Paper className="card h-100" style={{height: '330px', width: '240px'}}>
          <ContentLoader
            height={300}
            width={250}
            speed={2}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
            {...this.props}
          >
            <rect x="0" y="0.05" rx="0" ry="0" width="413" height="180" />
            <rect x="22" y="202" rx="4" ry="4" width="209" height="13" />
            <rect x="23" y="224" rx="4" ry="4" width="193" height="11.6" />
            <rect x="74" y="207.05" rx="0" ry="0" width="0" height="0" />
            <rect x="22" y="269.05" rx="0" ry="0" width="83" height="21" />
            <rect x="309" y="298.05" rx="0" ry="0" width="62" height="45" />
            <rect x="187" y="256.05" rx="0" ry="0" width="47" height="44" />
          </ContentLoader>
        </Paper>
      </Grid>
    )
  }
}
