import React,{PureComponent} from 'react'
import {
    CaretDownOutlined,
    UserOutlined,
    BellOutlined
} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import {post,Paths} from '../../../api'
import {userNavRoutes} from '../../../configs/route.config';
import DefaultUserIcon from '../../../assets/images/userIcon.png'

import './Header.scss'

const LOGO_TEXT = '物联网云平台';

export default class Header extends PureComponent  {
    
    logout = () => {
        post(Paths.logout,{},{loading:true}).then(() => {
            window.location = window.location.origin + window.location.pathname + '#/account/login';
        })
    }
    render () {
        const {onlyLogo,developerInfo={},newMessageNums={}} = this.props,
            {email,account}= developerInfo,
            {childmenus} = userNavRoutes[0],
            {totalUnRead} = newMessageNums;
        
        return (
            <header className="mainpage-header">
                <span className="logo">{LOGO_TEXT}</span>
                {
                    !onlyLogo && 
                    <div className='right'>
                        <a href="https://dp.clife.net/iotdoc" target="_blank">帮助文档</a>
                        <Link to="/open/repairOrder" >工单</Link>
                        <Link to="/messageCenter"  target="_blank">
                            <BellOutlined className='bellicon' />
                            { totalUnRead &&  <span className='msgnum'> {totalUnRead>99?99:totalUnRead} </span> || null }
                        </Link>
                        <div className='user'>
                            <img src={DefaultUserIcon} alt="用户头像" className="usericon"/>
                            <span className='username'>{email || account || '未知账号'}</span>
                            <CaretDownOutlined className='downicon'/>
                            <div className='hoverbox'>
                                <div className='comm-shadowbox menubox'>
                                    <div className='userbox'>
                                        {
                                            childmenus.map(({
                                                menuname,path,menuicon
                                            },index)=>{
                                                return <Link key={index} className="li" to={path} target="_blank">
                                                                <UserOutlined />
                                                                <span className='txt'>{menuname}</span>
                                                        </Link>
                                            })
                                        }
                                    </div>
                                    <div className='logout'><span className='click' onClick={this.logout}>退出账号</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </header>
        );
    }
}