/* 项目开始开发时，所有的控件都由此处引入，项目的路由全都使用此文件控制，但是会导致 按路由模块懒加载时import的子组件还是会打包到主js中 ，所以放弃使用该文件控制整个项目路由 */
/* 此文件需要保留，因为面包屑控件需要此文件；不过不再在这里引入模块组件 */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import { find, cloneDeep } from "lodash";
/*Open是业务入口页面*/
import Open from '../pages/open/Open';
import LogicDevelop from "../pages/logicDevelop";
/*账号管理页面 */
const Account = loadable(() => import('../pages/user-center/Account'))
/*消息中心页面 */
const MessageCenter = loadable(() => import('../pages/message-center/MessageCenter'))
/*用户中心页面 */
const UserCenter = loadable(() => import('../pages/user-center/UserCenter'))
/*数据服务-数据分析页面 */
const DataAnalysis = loadable(() => import('../pages/data-analysis/DataAnalysisi'))

/*左侧菜单导航全权限路由*/
export const navRoutes = [
    {
        menuname: '总览',
        path: '/open/home',
        menuicon: '',
    }, {
        menuname: '产品',
        path: '/open/product',
        menuicon: '',
        childmenus: [
            {
                menuname: '产品管理',
                path: '/open/product/proManage',
            },
            {
                menuname: '设备注册',
                path: '/open/product/devRegist',
            },
            {
                menuname: '固件升级',
                path: '/open/product/proManage',

            },
            {
                menuname: '规则引擎',
                path: '/open/product/devRegist',
            },
            {
                menuname: '云端定时',
                path: '/open/product/proManage',

            },
            {
                menuname: '远程配置',
                path: '/open/product/devRegist',
            },
        ]
    }, {
        menuname: '设备',
        path: '/open/device',
        menuicon: '',
        childmenus: [
            {
                menuname: '设备管理',
                path: '/open/device/devManage',

            },
            {
                menuname: '设备秘钥',
                path: '/open/product/deviceRegist',
            },
            {
                menuname: '设备分组',
                path: '/open/product/proManage',

            },
            {
                menuname: '设备消息',
                path: '/open/product/devRegist',
            }
        ]
    }, {
        menuname: 'APP',
        path: '/open/APP',
        menuicon: '',
        childmenus: [
            {
                menuname: 'APP开发',
                path: '/open/APP',
            }
        ]
    }, {
        menuname: '数据服务',
        path: '/open/serve',
        menuicon: '',
        childmenus: [
            {
                menuname: '设备分析',
                path: '/open/serve/device',

            },
            {
                menuname: '用户分析',
                path: '/open/serve/user',
            },
            {
                menuname: '数据订阅',
                path: '/open/serve/dataSub',

            }
        ]
    }, {
        menuname: '开发Studio',
        path: '/open/studio',
        menuicon: '',
        childmenus: [
            {
                menuname: '项目管理',
                path: '/open/studio/project',

            },
            {
                menuname: '服务开发',
                path: '/open/studio/serve',
            }
        ]
    }
]
export const mainRoutes = [
    {
        path: '/open',
        component: Open
    },
    {
        path: '/account',
        component: Account
    },
    {
        path: '/logicDevelop/:projectId/:serviceId',
        component: LogicDevelop
    },
    {
        path: '/userCenter',
        component: UserCenter
    },
    {
        path: '/messageCenter',
        component: MessageCenter
    },
    {
        path: '/dataAnalysis/:projectId/:serviceId',
        component: DataAnalysis
    },
    {
        redirect: '/account'
    }
];
export const menuList = [
    {
        menuname: '总览',
        childmenus: [],
        items: [],
    },
    {
        menuname: '产品',
        childmenus: [
            {
                menuname: '产品管理',
                childmenus: [],
                items: ['基本信息', '功能定义', '控制面板', '硬件开发', '服务配置', '调试验证'],
            },
            {
                menuname: '设备注册',
                childmenus: [],
                items: [],
            },
            {
                menuname: '固件升级',
                childmenus: [],
                items: [],
            },

            {
                menuname: '规则引擎',
                childmenus: [],
                items: [],
            },
            {
                menuname: '云端定时',
                childmenus: [],
                items: [],
            },
            {
                menuname: '远程配置',
                childmenus: [],
                items: [],
            },
        ],
        items: [],
    },
    {
        menuname: '设备',
        childmenus: [
            {
                menuname: '设备管理',
                childmenus: [],
                items: ['基本信息', '设备影子', '设备标签', '远程配置'],
            },
            {
                menuname: '设备秘钥',
                childmenus: [],
                items: [],
            },
            {
                menuname: '设备分组',
                childmenus: [],
                items: [],
            },
            {
                menuname: '设备消息',
                childmenus: [],
                items: [],
            },
        ],
        items: [],
    },
    {
        menuname: 'APP',
        childmenus: [
            {
                menuname: 'APP开发',
                childmenus: [],
                items: ['基本信息', '关联产品', '版本发布'],
            },
        ],
        items: [],
    },
    {
        menuname: '数据服务',
        childmenus: [
            {
                menuname: '设备分析',
                childmenus: [],
                items: [],
            },
            {
                menuname: '用户分析',
                childmenus: [],
                items: [],
            },
            {
                menuname: '数据订阅',
                childmenus: [],
                items: [],
            },
        ],
        items: [],
    },
    {
        menuname: '开发Studio',
        childmenus: [
            {
                menuname: '项目管理',
                childmenus: [],
                items: [],
            },
            {
                menuname: '服务开发',
                childmenus: [],
                items: [],
            }
        ],
        items: [],
    },
    // {
    //     menuname:'用户中心',
    //     childmenus:[
    //         {
    //             menuname:'基本资料',
    //             childmenus:[],
    //             items:[],
    //         },
    //         {
    //             menuname:'安全设置',
    //             childmenus:[],
    //             items:[],
    //         },
    //         {
    //             menuname:'访问用户',
    //             childmenus:[],
    //             items:[],
    //         },
    //         {
    //             menuname:'用户角色',
    //             childmenus:[],
    //             items:[],
    //         },
    //         {
    //             menuname:'操作日志',
    //             childmenus:[],
    //             items:[],
    //         },
    //     ],
    //     items:[],
    // },
]


export function PrivateRoute({ component: Component, redirect, path, isOk = false, ...rest }) {

    return (
        <Route
            path={path}
            render={props => {
                return isOk ? (
                    <Component {...props} {...rest} />
                ) :
                    <Redirect to={redirect}></Redirect>
            }
            }
        />
    )
}

export function RouteWithSubRoutes(route) {
    let { path, component: Component, redirect } = route;

    if (Component) {
        return (
            <Route
                path={path}
                render={props => (<Component {...props} />)}
            />
        );
    }
    return <Redirect to={redirect}></Redirect>
}



export function getNavRoutes(menu) {

    let _navRoutes = navRoutes;

    function authorityMenu(menus) {
        let result = menus.map(({
            menuname,
            childmenus = [],
            items = [],
        }) => {
            let _nav = find(_navRoutes, ['menuname', menuname]);

            if (childmenus.length > 0) {
                _navRoutes = _nav.childmenus;
                _nav.childmenus = authorityMenu(childmenus)
            }
            return { ..._nav, items }

        })
        _navRoutes = navRoutes;
        return result
    }
    return authorityMenu(menu)
}

