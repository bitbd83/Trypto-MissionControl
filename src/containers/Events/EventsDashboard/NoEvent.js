import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IntlMessages from 'util/IntlMessages';


class NoEvent extends React.Component {
  render() {
    return (
      <Grid item xs={12}>
        <Paper className="card d-flex flex-column align-items-center">
            <div className="card-body p-3">
              <Typography variant="title">
                No Event
              </Typography>
            </div>
        </Paper>
      </Grid>
    );
  }
}

export default NoEvent;
