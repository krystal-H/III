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

function getNavList(menus){
    console.log(444,menus)
    return menus.map(({
        menuicon,menuname,path,childmenus=[]
        },index)=>{
        if(childmenus.length>0){
            return <SubMenu key={menuname+index} icon={<MailOutlined />} title={menuname}>
                        {getNavList(childmenus)}
                    </SubMenu>
        }
        
        return <Menu.Item key={ menuname + index}>
                    <Link to={path}>{menuname}</Link>
                </Menu.Item>
    })
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
        let {collapsed,menulist} = this.props;
        const {defaultSelectedKeys, defaultOpenKeys} = this.state;

        return (
            <div className="menu-wapper">
                <Menu
                    className="self-menu"
                    // defaultSelectedKeys={defaultSelectedKeys}
                    // defaultOpenKeys={defaultOpenKeys}
                    mode="inline"
                    inlineCollapsed={collapsed}
                    inlineIndent={22}
                    forceSubMenuRender={true}
                >
                    {getNavList(menulist)}
                </Menu>
            </div>
        );
    }
}

export default withRouter(NavMenu)
