
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

const Detail = loadable(() => import('./groupDetails'));
const DeviceGroup = loadable(() => import('./deviceGroup'));

export default function Group( {match:{path}} ) {
    
    return (
        <Switch>
            <Route path={`${path}/list`} component={DeviceGroup} ></Route>
            <Route path={`${path}/details/:groupid/:groupidid`} component={Detail} ></Route>
            <Redirect to={`${path}/list`} />
        </Switch>
    )
}

