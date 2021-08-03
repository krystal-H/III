import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

const DeviceMn = loadable(() => import('./deviceMn'));

const routes = {
    '设备管理': DeviceMn,
    '设备密钥': DeviceMn,
    '设备告警': DeviceMn,
    '设备分组': DeviceMn,
}

export default function Product({ match: { path }, childmenus }) {
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
