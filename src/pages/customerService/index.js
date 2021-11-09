import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Input } from 'antd';
import './index.scss';
import store from '../../store';
import {showCustomerService} from './store/reducer'


let hostname = location.hostname;
if( hostname =='localhost' ){
    hostname = 'dp.clife.net'

}
let ws = null, //保存websocket连接
    wsTimer = null; //websocket心跳连接定时器，页面销毁时，需要同时销毁定时器

// 如果存在连接的ws, 关闭，并置空（下次启动是新的连接） 
const closeWebsocket = ()=>{
    if(ws){
        ws.close();
        ws = null;
    }
    clearInterval(wsTimer);
}


const mapStateToProps = state => {
    return {
        showMod: state.getIn(['customerService', 'showCustomerService'])
    }
}
function CustomerService({
    showMod  
}) {
    useEffect(() => {

        // newWebSocket();
       
    }, [])
    const [wsConnect, setWsConnect] = useState(false)
    const [inputValue, setInputValue] = useState("")

    //建立 ws 连接
    const newWebSocket = ()=> {

        ws = new WebSocket(`wss://${hostname}/v5x/web/open/tech/support/ws`);
        ws.onopen = ()=> {//连接成功
            console.log("---连接成功----")
            setWsConnect(true)
            clearInterval(wsTimer);
            wsTimer = setInterval(()=>{ ws.send('') }, 10000); //告诉服务器“请保持联系”
            

            let sendMsg  = {type:1,message:'1qweqweqweqwe'}
            ws.send(JSON.stringify(sendMsg));

        };
        ws.onmessage =  (data)=> {//接收到消息

            console.log('--get--',data)
            
        };
        ws.onclose = (e) =>{//检测到断开连接
            console.log("---断开连接----",wsConnect)
            clearInterval(wsTimer);
            ws = null;
            if ( wsConnect && e.code == '1006') {//如果异常断开，尝试重连
                setTimeout(newWebSocket,5000);
            }
            setWsConnect(false)
            
        }
    }
   
    

    const switchOpen=()=>{
        let newShow = !showMod;
        store.dispatch(showCustomerService(newShow));
        if(newShow && !ws){//开启连接
            newWebSocket();
        }else{//关闭连接
            closeWebsocket()

        }
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
