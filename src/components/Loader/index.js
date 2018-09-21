import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = () => {
    return (
      <div className="d-flex justify-content-center m-4">
        <CircularProgress/>
      </div>
    )
};

export default Loader;
