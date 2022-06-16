import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

const DeviceMn = loadable(() => import('./home'));
const DeviceWarn = loadable(() => import('./deviceWarning'));
const DataDownload = loadable(() => import('./dataDownload'))

const routes = {
    '设备管理': DeviceMn,
    // '设备密钥': null, //暂时不开放 20210816
    '设备消息': DeviceWarn,//即：设备告警
    '数据下载': DataDownload, // 数据下载
}

export default function Device({ childmenus }) {
    return (
        <Switch>
            {
                childmenus.map(({
                    menuname,
                    items = [],
                    path
                }, i) => {
                    const RouteComponent = routes[menuname];
                    if (RouteComponent) {
                        return <Route key={i} path={path}
                            render={props => <RouteComponent {...props} authItem={items} />}
                        ></Route>
                    }
                })
                
            }
            <Redirect to={childmenus[0].path} />
        </Switch>
    )
}
