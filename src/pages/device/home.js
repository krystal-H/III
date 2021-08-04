import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
const DeviceMn = loadable(() => import('./deviceMn'));
const DeviceInfo = loadable(() => import('./deviceDetail'));
export default function DeviceManage({ match }) {
    let { path } = match;
    return (
        <Switch>
            <Route path={`${path}/list`} component={DeviceMn}></Route>
            <Route path={`${path}/detail/:id`} component={DeviceInfo}></Route>
            <Redirect to={`${path}/list`}></Redirect>
        </Switch>
    )
}
