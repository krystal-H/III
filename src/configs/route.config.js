
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import { find, remove } from "lodash";
/*Open是业务入口页面*/
import Open from '../pages/open/Open';

// import LogicDevelop from "../pages/logicDevelop";

/*账号管理页面 */
const Account = loadable(() => import('../pages/user-center/Account'))
/*消息中心页面 */
const MessageCenter = loadable(() => import('../pages/message-center/MessageCenter'))
/*用户中心页面 */
const UserCenter = loadable(() => import('../pages/user-center/UserCenter'))
/*数据服务-数据分析页面 */
// const DataAnalysis = loadable(() => import('../pages/data-analysis/DataAnalysisi'))

/* 左侧菜单、用户中心 导航全权限路由
    * menuid 仅用于前端遍历key  和 判断选中的高亮菜单匹配地址栏的路由
    * 开发Studio 暂时不开放
    * 用户中心 由前端控制 不从接口获取

*/
export const navRoutes = [
    {
        menuname: '总览',
        path: '/open/home',
        menuicon: 'zonglan',
        menuid: '0'
    }, {
        menuname: '产品',
        path: '/open/product',
        menuicon: 'chanpin',
        menuid: '1',
        childmenus: [
            {
                menuname: '产品管理',
                path: '/open/product/proManage',
                menuid: '1-0',
            },
            {
                menuname: '设备注册',
                path: '/open/product/devRegist',
                menuid: '1-1',
            },
            {
                menuname: '固件升级',
                path: '/open/product/otaUpdate',
                menuid: '1-2',

            },
            {
                menuname: '场景服务',
                path: '/open/product/ruleEngine',
                menuid: '1-3',
            },
            {
                menuname: '云端定时',
                path: '/open/product/cloudTimer',
                menuid: '1-4',

            },
            {
                menuname: '远程配置',
                path: '/open/product/remoteCofig',
                menuid: '1-5',
            },
        ]
    }, {
        menuname: '设备',
        path: '/open/device',
        menuicon: 'shebei',
        menuid: '2',
        childmenus: [
            {
                menuname: '设备管理',
                path: '/open/device/devManage',
                menuid: '2-0',

            },
            // {
            //     menuname: '设备秘钥',
            //     path: '/open/device/devSecret',
            //     menuid:'2-1',
            // },
            {
                menuname: '设备分组',
                path: '/open/device/devGroup',
                menuid: '2-2',

            },
            {
                menuname: '设备消息',
                path: '/open/device/devMsg',
                menuid: '2-3',
            }
        ]
    }, {
        menuname: '应用',
        path: '/open/app',
        menuicon: 'app',
        menuid: '3',
        childmenus: [
            {
                menuname: '应用管理',
                path: '/open/app',
                menuid: '3-0',
            },
        ]
    },
    {
        menuname: '数据',
        path: '/open/serve',
        menuicon: 'shujufw',
        menuid: '4',
        childmenus: [
            {
                menuname: '设备分析',
                path: '/open/serve/device',
                menuid: '4-0',

            },
            {
                menuname: '用户分析',
                path: '/open/serve/user',
                menuid: '4-1',
            },
            {
                menuname: '数据订阅',
                path: '/open/serve/dataSub',
                menuid: '4-2',

            }
        ]
    },
    {
        menuname: '项目',
        path: '/open/project',
        menuicon: 'shujufw',
        menuid: '5',
        childmenus: [
            {
                menuname: '项目管理',
                path: '/open/project/projectManage',
                menuid: '5-0',

            },
        ]
    }
    // {
    //     menuname: '数据服务',
    //     path: '/open/serve',
    //     menuicon: 'shujufw',
    //     menuid:'4',
    // }
    // {
    //     menuname: '开发Studio',
    //     path: '/open/studio',
    //     menuicon: 'studio',
    //     menuid:'5',
    //     childmenus: [
    //         {
    //             menuname: '项目管理',
    //             path: '/open/studio/project',
    //             menuid:'5-0',

    //         },
    //         {
    //             menuname: '服务开发',
    //             path: '/open/studio/serve',
    //             menuid:'5-1',
    //         }
    //     ]
    // }
]

export const userNavRoutes = [
    {
        menuname: '用户中心',
        path: '/userCenter',
        menuicon: 'yonghuzx',
        menuid: '用户中心',
        childmenus: [
            {
                menuname: '基本资料',
                path: '/userCenter/baseInfo',
                menuid: '基本资料',

            },
            {
                menuname: '安全设置',
                path: '/userCenter/security',
                menuid: '安全设置',
            },
            {
                menuname: '访问用户',
                path: '/userCenter/visitUser',
                menuid: '访问用户',
            },
            {
                menuname: '用户角色',
                path: '/userCenter/role',
                menuid: '用户角色',
            }
        ]
    }
]

/* 平台主结构路由*/
export const mainRoutes = [
    {
        path: '/open',
        component: Open
    },
    {
        path: '/account',
        component: Account
    },
    // {
    //     path: '/logicDevelop/:projectId/:serviceId',
    //     component: LogicDevelop
    // },
    {
        path: '/userCenter',
        component: UserCenter
    },
    {
        path: '/messageCenter',
        component: MessageCenter
    },
    // {
    //     path: '/dataAnalysis/:projectId/:serviceId',
    //     component: DataAnalysis
    // },
    {
        redirect: '/account'
    }
];

/* 模拟后台返回的权限*/
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
                menuname: '场景服务',
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
            // {
            //     menuname: '设备秘钥',
            //     childmenus: [],
            //     items: [],
            // },
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
        menuname: '应用',
        childmenus: [
            {
                menuname: '应用管理',
                childmenus: [],
                items: ['基本信息', '关联产品', '版本发布'],
            }
        ],
        items: [],
    },
    {
        menuname: '数据',
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
        menuname: '项目',
        childmenus: [
            {
                menuname: '项目管理',
                childmenus: [],
                items: ['概述', 'openAPI', '分组', '设备'],
            }
        ],
        items: [],
    },
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

/* 获得有权限的菜单路由 和 相关页面内的tab元素权限 *  用户中心菜单改为前端控制，不在此处权限配置内  **/
export function getNavRoutes(menu) {
    // debugger
    let _navRoutes = navRoutes;
    function authorityMenu(menus) {
        let result = menus.map(({
            menuname,
            childmenus = [],
            items = [],
        }) => {

            if (menuname == "规则引擎") {
                menuname = "场景服务"
            }
            let _nav = find(_navRoutes, (o) => o.menuname == menuname) 
            || {
                menuname: menuname + "（暂不支持）",
                path: '/open/home',
                menuid: menuname,
            };

            if (childmenus.length > 0) {
                _navRoutes = _nav.childmenus;
                _nav.childmenus = authorityMenu(childmenus)
            }
            return { ..._nav, items }
        })
        _navRoutes = navRoutes;
        return result
    }
    const _routes = authorityMenu(menu);
    return _routes
}
