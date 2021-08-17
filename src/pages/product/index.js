import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

const ProductManage = loadable(() => import('./product-manage'));
const DeviceRegist = loadable(() => import('./deviceRegist'));
const Application = loadable(() => import('./application/Application'));
const CloudTime = loadable(() => import('./cloudTime'))

const routes = {
    '产品管理': ProductManage,
    '设备注册': DeviceRegist,
    '固件升级': ProductManage,
    '规则引擎': ProductManage,
    '云端定时': CloudTime,
    '远程配置': ProductManage,
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
