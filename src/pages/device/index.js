import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

const DeviceMn = loadable(() => import('./home'));
const DeviceGroup = loadable(() => import('./deviceGroup/deviceGroup'));

const routes = {
    '设备管理': DeviceMn,
    // '设备密钥': DeviceMn, //暂时不开放 20210816
    '设备消息': DeviceMn,//即：设备告警
    '设备分组': DeviceGroup,
}

export default function Device({ match: { path }, childmenus }) {
    // console.log(33,childmenus)
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
