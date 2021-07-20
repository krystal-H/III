import React, { PureComponent } from 'react'
import {Link, withRouter} from 'react-router-dom';
import { Menu } from 'antd';
import './NavMenu.scss';

const { SubMenu } = Menu;


class NavMenu extends PureComponent {
    state = {
        openKeys:[],
        selectedKeys:[],
    }
    componentDidMount(){
        this.props.history.listen( ({pathname})=>{
            this.setCurMenu(pathname)
        } )
    }
    getNavList = menus=>{
    
        return menus.map(({
            menuicon,menuname,path,childmenus=[],menuid
            },index)=>{
            if(childmenus.length>0){
                return <SubMenu key={menuid||menuname} 
                                icon={<span className={`selficon ${menuicon}`}></span>} 
                                title={menuname}
                                onTitleClick={({key})=>{this.titleClick(key)}}
                        >
                            {this.getNavList(childmenus)}
                        </SubMenu>
            }
            return <Menu.Item key={menuid||menuname} 
                        icon={
                            menuicon &&
                            <span className={`selficon ${menuicon}`}></span> || null
                        }>
                        <Link to={path}>{menuname}</Link>
                    </Menu.Item>
        })
    }
    setCurMenu= pathname => {//根据地址栏路由 设置高亮菜单，用于所有有导致地址栏变化的情况（第一次加载、刷新、返回按钮、菜单点击）
        const {menulist,history} = this.props;
        const {openKeys} = this.state;
        const pathurl = pathname || history.location.pathname;
        for(let i=0;i<menulist.length;i++){
            let { childmenus=[],path,menuid,menuname } = menulist[i];
            let keyid = menuid || menuname;
            if(childmenus.length>0){
                for(let j=0;j<childmenus.length;j++){
                    let {path,menuid,menuname } = childmenus[j];
                    if(pathurl.indexOf(path)>-1){
                        this.setState({
                            selectedKeys:[menuid||menuname],
                            openKeys:Array.from(new Set([...openKeys,keyid]))
                        })
                        return
                    }
                }
            }else{
                if(pathurl.indexOf(path)>-1){
                    this.setState({selectedKeys:[keyid],});
                    if(openKeys.length==0){
                        for(let i=0;i<menulist.length;i++){
                            let { childmenus=[],menuid,menuname } = menulist[i];
                            if(childmenus.length>0){ //将第一个有子菜单的父菜单展开
                                this.setState({openKeys:[menuid || menuname]});
                                return;
                            }
                        }
                    }
                    return
                }
            }
        }
    }
    titleClick= key =>{
        const {openKeys} = this.state;
        let newopenkey = [...openKeys];
        const kindex = openKeys.indexOf(key);
        if(kindex>-1){
            newopenkey.splice(kindex,1)
        }else{
            newopenkey.push(key)
        }
        this.setState({
            openKeys:newopenkey
        })
        
    }
    componentDidUpdate(oldprops){  
        const {menulist} = this.props;
        if(oldprops.menulist.length==0 && menulist.length>0){//第一次接收到 menulist 时
            this.setCurMenu();
        }
    }
    render() {
        const {collapsed,menulist} = this.props;
        const {openKeys,selectedKeys,} = this.state;
        return (
            <div className="menu-wapper">
                <Menu
                    className="self-menu"
                    mode="inline"
                    inlineCollapsed={collapsed}
                    inlineIndent={22}
                    forceSubMenuRender={true}
                    openKeys={openKeys}
                    selectedKeys={selectedKeys}
                >
                    {this.getNavList(menulist)}
                </Menu>
            </div>
        );
    }
}

export default withRouter(NavMenu)
