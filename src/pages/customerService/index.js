import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Input } from 'antd';
import './index.scss';
import store from '../../store';
import {showCustomerService} from './store/reducer'

const mapStateToProps = state => {
    return {
        showMod: state.getIn(['customerService', 'showCustomerService'])
    }
}
function CustomerService({
    showMod  
}) {
    useEffect(() => {
       
    }, [])
   
    const [a, setA] = useState([])

    const switchOpen=()=>{
        let newShow = !showMod;
        store.dispatch(showCustomerService(newShow));
    }
    
  
    return <>
        <div className="customer-service comm-shadowbox" style={{display:showMod?'flex':'none'}}>
            <div className='tit'>客服<span className="close" onClick={switchOpen}> </span></div>
            <div className='content'>
                <div className='onechat left'><span className='bubble'>欢迎联系C-life客服，请问有什么可以帮您的吗？</span></div>
                <div className='onechat left'><span className='bubble'>欢迎联系C-life客服，请问有什么life客服，请问有什么可以帮您的吗？life客服，请问有什么可以帮您的吗</span></div>
                <div className='onechat right'><span className='bubble'>你好呀，这个客服怎么这么难用呀</span></div>
                <div className='onechat left'><span className='bubble'>欢迎联系C-life客服，请问有什么可以帮您的吗？</span></div>
                <div className='onechat right'><span className='bubble'>欢迎联系C-life客欢迎联系C欢迎联系C服，请问有什么可以请问有什么可以请问有什么可以帮您的</span></div>
            </div>
            <div className='inputbox'>
                <span className='imgbtn'></span>
                <span className='sendbtn'>发送</span>
                <Input.TextArea className='textarea' placeholder="请输入您的问题..." bordered={false} maxLength={200} />
            </div>
        </div>
        <div className='customer-service-switch-show' onClick={switchOpen}> </div>
    </>
}

export default connect(mapStateToProps, null)(CustomerService)
