import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

const DeviceA = loadable(() => import('./device'));
const UserA = loadable(() => import('./user'));
const Subscribe = loadable(() => import('./subscribe'));
const routes = {
    '设备分析': DeviceA,
    '用户分析': UserA,
    '数据订阅': Subscribe,
}

export default function Device({ match: { path }, childmenus }) {
    return (
        <Switch>
            {
                childmenus.map(({
                    menuname,
                    items = [],
                    path
                }, i) => <Route key={i} path={path} component={routes[menuname]} authItem={items}></Route>
                )
            }
            <Redirect to={childmenus[0].path} />
        </Switch>
    )
}
