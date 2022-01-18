import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

const ProductManage = loadable(() => import('./product-manage'));
const DeviceRegist = loadable(() => import('./deviceRegist'));
const OtaUpgrade = loadable(() => import('./ota-upgrade'));
const CloudTime = loadable(() => import('./cloudTime'))
const RemoteConfig = loadable(() => import('./remote-config'))
const SceneSevice=loadable(() => import('./sceneSevice'))
const PushNotification=loadable(() => import('./pushNotification'))

const routes = {
    '产品管理': ProductManage,
    '设备注册': DeviceRegist,
    '固件升级': OtaUpgrade,
    '场景服务': SceneSevice,
    '云端定时': CloudTime,
    '远程配置': RemoteConfig,
    '消息推送': PushNotification,
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
