import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux';
import { Input } from 'antd';
import './index.scss';
import store from '../../store';
import {showCustomerService} from './store/reducer'
import { Notification } from '../../components/Notification'


let hostname = location.hostname ;
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
const sendMsg = (message="")=>{
    let m = {type:1,message}
    return JSON.stringify(m)
}
const defaultMsg = {message:'欢迎联系C-life客服，请问有什么可以帮您的吗？',senderName:'客服',time:''}


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
    const connectRef = useRef(false);//记录连接成功
    const [inputValue, setInputValue] = useState("")
    const [content, setContent] = useState([defaultMsg])

    //建立 ws 连接
    const newWebSocket = ()=> {
        ws = new WebSocket(`wss://${hostname}/v5x/web/open/tech/support/ws`);
        ws.onopen = ()=> {//连接成功
            console.log("---连接成功----")
            connectRef.current = true;
            clearInterval(wsTimer);
            wsTimer = setInterval(()=>{ ws.send(sendMsg()) }, 10000); //告诉服务器“请保持联系”
        };
        ws.onmessage =  ({data="{}"})=> {//接收到消息
            let onemsg = JSON.parse(data)

            console.log('--get--',data.data)
            setContent(pre=>[...pre,onemsg])
            
        };
        ws.onclose = (e) =>{//检测到断开连接
            console.log("---断开连接----")
            clearInterval(wsTimer);
            ws = null;
            if ( connectRef.current && e.code == '1006') {//如果异常断开，尝试重连
                setTimeout(newWebSocket,5000);
            }
            connectRef.current = false;
            
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
    const sendHandle = ()=>{
        if(inputValue){
            if(ws){
                ws.send(sendMsg(inputValue))
                setInputValue("")
            }else{
                Notification({
                    // type: 'warn',
                    description: '连线中......'
                })
            }
        }  
    }
    const changeInput = (e)=>{
        setInputValue(e.target.value)
    }
    
  
    return <>
        <div className="customer-service comm-shadowbox" style={{display:showMod?'flex':'none'}}>
            <div className='tit'>客服<span className="close" onClick={switchOpen}> </span></div>
            <div className='content'>
                {
                    content.map(({message,senderName,time})=>{
                        return <div className={`onechat ${senderName=='客服'?'left':'right'}`}>
                                    <span className='bubble'>{message}</span>
                                </div>

                    })
                }
                {/* <div className='onechat left'><span className='bubble'>欢迎联系C-life客服，请问有什么可以帮您的吗？</span></div> */}
            </div>
            <div className='inputbox'>
                <span className='imgbtn'></span>
                <span className='sendbtn' onClick={sendHandle}>发送</span>
                <Input.TextArea className='textarea' placeholder="请输入您的问题..." bordered={false} maxLength={200}
                    value={inputValue}
                    onChange={changeInput}
                />
            </div>
        </div>
        <div className='customer-service-switch-show' onClick={switchOpen}> </div>
    </>
}

export default connect(mapStateToProps, null)(CustomerService)
