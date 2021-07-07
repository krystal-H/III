import React,{PureComponent} from 'react'

import {
    CaretDownOutlined,
    ClusterOutlined,
    LogoutOutlined,
    SafetyCertificateOutlined,
    SnippetsOutlined,
    SoundOutlined,
    TeamOutlined,
    UserOutlined,
    BellOutlined
} from '@ant-design/icons';

import { Modal, Radio } from 'antd';
import {Link,withRouter} from 'react-router-dom';
import {post,Paths} from '../../../api'
import store from '../../../store'

import './Header.scss'

import DefaultUserIcon from '../../../assets/images/common/userIcon@2x.png'

const LOGO_TEXT = '物联网云平台';

export default class Header extends PureComponent  {
    
    logout = () => {
        console.log(222,this.props)
        return;

        post(Paths.logout,{},{loading:true}).then(() => {
            window.location = window.location.origin + window.location.pathname + '#/account/login';
            localStorage.removeItem('menuList');//退出成功时，清除菜单缓存，只能放在跳转之后再执行。不然退出时就会出错
        })
    }
    render () {
        let {onlyLogo,developerInfo:{email,account,isSubUser},newMessageNums:{totalUnRead}} = this.props,
            messageIconClassName = '';
        if (totalUnRead) {
            messageIconClassName += " nums-wrapper"
            if (totalUnRead > 99) {
                totalUnRead = '99+'
                messageIconClassName += " max-num"
            }
        }

        return (
            <header className="page-header">
                <span className="logo">{LOGO_TEXT}</span>
                {
                    !onlyLogo && 
                    <>
                        

                        <Link to="/messageCenter" target="_blank">帮助文档</Link>
                        <Link to="/messageCenter" >工单</Link>
                        <Link to="/messageCenter" target="_blank">
                            <BellOutlined data-nums={totalUnRead} className={messageIconClassName} />
                        </Link>



                        {/* 用户中心入口 */}
                        <section className="user-icon-wrapper">
                            <img src={DefaultUserIcon} alt="用户头像" className="user-img"/>
                            <CaretDownOutlined />
                            <div className="menus-wrapper">
                                <div className="icon-base-info">
                                    <span className="single-text" style={{flex:1}}>{email || account || '未获取到邮箱'}</span>
                                    <span className="right"
                                        onClick={this.logout}
                                        >
                                        <LogoutOutlined />
                                        &nbsp;退出
                                    </span>
                                </div>
                                <div className="user-menus">
                                    <div className="menus-item">
                                        <Link to="/userCenter/info" target="_blank">
                                            <span>
                                                <UserOutlined />
                                                &nbsp;基本资料</span>
                                        </Link>
                                    </div>
                                    {
                                        // 子账号（isSubUser：1）没有以下内容
                                        (isSubUser === 0 )&& 
                                        <React.Fragment>
                                            <div className="menus-item">
                                                <Link to="/userCenter/security" target="_blank">
                                                    <span>
                                                        <SafetyCertificateOutlined />
                                                        &nbsp;安全设置</span>
                                                </Link>
                                            </div>
                                            <div className="menus-item">
                                                <Link to="/userCenter/visit" target="_blank">
                                                    <span>
                                                        <TeamOutlined />
                                                        &nbsp;访问用户</span>
                                                </Link>
                                            </div>
                                            <div className="menus-item">
                                                <Link to="/userCenter/role" target="_blank">
                                                    <span>
                                                        <ClusterOutlined />
                                                        &nbsp;用户角色</span>
                                                </Link>
                                            </div>
                                            <div className="menus-item">
                                                <Link to="/userCenter/log" target="_blank">
                                                    <span>
                                                        <SnippetsOutlined />
                                                        &nbsp;操作日志</span>
                                                </Link>
                                            </div>
                                        </React.Fragment>
                                    }
                                </div>
                            </div>
                        </section>
                        
                    </>
                }
            </header>
        );
    }
}

// export default withRouter(Header)
