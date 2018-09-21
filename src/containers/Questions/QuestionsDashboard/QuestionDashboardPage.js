import React from 'react';
import { Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

const Questions = ({match}) => (
  <div className="app-wrapper">
    <Switch>
      <Route path={`${match.url}`} component={asyncComponent(() => import('./routes/index'))} />
      <Route component={asyncComponent(() => import('components/Error404'))} />
    </Switch>
  </div>
);

export default Questions;
