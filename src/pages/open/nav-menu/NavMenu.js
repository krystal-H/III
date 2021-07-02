import React, { PureComponent } from 'react'
import {Link, withRouter} from 'react-router-dom';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Menu } from 'antd';
import MyIcon from '../../../components/my-icon/MyIcon';
import {isEqual} from 'lodash';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
  } from '@ant-design/icons';
import './NavMenu.scss';

const { SubMenu } = Menu;

//校验一、二级菜单是否有权限
function AuthorityToJudge (muenList=[],name='') {
    name = name.indexOf('*')>-1?name.slice(1):name;
    return muenList.indexOf(name);
}
class NavMenu extends PureComponent {
    state = {
        defaultSelectedKeys: ['1'],
        defaultOpenKeys: ['sub1'],
    }

    componentWillMount(){
        // const {routes, history , muenList} = this.props;
        // let pathname = history.location.pathname;

        // if (pathname === '/open' && muenList[0] && muenList[0].menus && muenList[0].menus[0]) { // 登录入口进来时开始渲染此组件时，pathname为 /open
        //     pathname += `/${muenList[0].url}/${muenList[0].menus[0].url}`
        // }
        
        // routes.map((item, index) => {
        //     item.routes && item.routes.map(inner => {
        //         if(pathname.indexOf(item.path) >= 0 && pathname.indexOf(inner.path) >= 0){
              
        //             this.setState({
        //                 defaultOpenKeys: [`${item.menuId}`],
        //                 defaultSelectedKeys: [`${inner.menuId}`]
        //             })
        //         }
        //     })
        // })
    }
    componentDidMount(){
        
    }
    componentDidUpdate(propsold,stateold){   
    }
    render() {
        let {collapsed,routes} = this.props;
        const {defaultSelectedKeys, defaultOpenKeys} = this.state;

        return (
            <div className="menu-wapper">
                <Menu
                    className="self-menu"
                    defaultSelectedKeys={defaultSelectedKeys}
                    defaultOpenKeys={defaultOpenKeys}
                    mode="inline"
                    inlineCollapsed={collapsed}
                    inlineIndent={22}
                    forceSubMenuRender={true}
                >
                    <Menu.Item key="1" icon={<DesktopOutlined />}>总览</Menu.Item>
                    <SubMenu key="sub1" icon={<MailOutlined />} title="产品">
                        <Menu.Item key="5">产品管理</Menu.Item>
                        <Menu.Item key="6">设备注册</Menu.Item>
                        <Menu.Item key="7">固件升级</Menu.Item>
                        <Menu.Item key="8">场景服务</Menu.Item>
                    </SubMenu>

                </Menu>
            </div>
        );
    }
}

export default withRouter(NavMenu)
