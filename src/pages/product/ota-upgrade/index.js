import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import FirmwareManagement from './FirmwareManagement';
import FirmwareDetails from './FirmwareDetails';
import BatchDetail from './BatchDetail';

function DataSubscription({ match }) {
    let { path } = match;
    // console.log("DataSubscription -> path", path)
    return (
        <Switch>
            <Route path={`${path}/list`} component={FirmwareManagement} />
            <Route path={`${path}/details/:id`} component={FirmwareDetails} />
            <Route path={`${path}/batch/:verid/:id`} component={BatchDetail} />
            <Redirect to={`${path}/list`} />
        </Switch>
    )
}

export default  DataSubscription;
