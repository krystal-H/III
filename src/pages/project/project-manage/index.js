import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
const ProjectList = loadable(() => import('./project-list/list'));
const ProjectDetail = loadable(() => import('./project-detail/project-detail'));
export default function ProductManage({ match }) {
  let { path } = match;
  return (
    <Switch>
      <Route path={`${path}/list`} component={ProjectList}></Route>
      <Route path={`${path}/detail/:id`} component={ProjectDetail}></Route>
      <Redirect to={`${path}/list`}></Redirect>
    </Switch>
  )
}
