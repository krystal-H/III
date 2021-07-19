import React, { PureComponent } from 'react'
import {Link, withRouter} from 'react-router-dom';
import { Menu } from 'antd';
import './NavMenu.scss';

const { SubMenu } = Menu;

function getNavList(menus){
    
    return menus.map(({
        menuicon,menuname,path,childmenus=[]
        },index)=>{
        if(childmenus.length>0){
            return <SubMenu key={menuname+index} icon={
                <span className={`selficon ${menuicon}`}></span>
            } title={menuname}>
                        {getNavList(childmenus)}
                    </SubMenu>
        }
        return <Menu.Item key={ menuname + index} 
                    icon={
                        menuicon &&
                        <span className={`selficon ${menuicon}`}></span> || null
                    }>
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
        // const { history , menulist} = this.props;
        
        // let pathname = history.location.pathname;
        // console.log(333,this.props.history)

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
        console.log('---DidMount--',this.props.history)
        this.props.history.listen(({pathname}) => {
            console.log('--listen--',pathname)

         })
    }
    componentDidUpdate(oldprops,oldstate){  
        const { history , menulist} = this.props;
        
        let pathname = history.location.pathname;
        console.log(333,pathname,menulist,oldprops.history.location.pathname)

    }
    render() {
        let {collapsed,menulist} = this.props;
        const {defaultSelectedKeys, defaultOpenKeys} = this.state;

        return (
            <div className="menu-wapper">
                <Menu
                    className="self-menu"
                    // defaultSelectedKeys={['总览0']}
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
