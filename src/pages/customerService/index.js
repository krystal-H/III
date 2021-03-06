import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux';
import { Input, Upload  } from 'antd';
import './index.scss';
import store from '../../store';
import {showCustomerService} from './store/reducer'
import { Notification } from '../../components/Notification'
import {DateTool} from '../../util/util'
import {post, Paths} from '../../api';
import {UpFileToCloud} from '../../components/UpFileToCloud';
import {CheckUpFile} from '../../components/CheckUpFile';

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
const pagerows = 5;

const mapStateToProps = state => {
    return {
        showMod: state.getIn(['customerService', 'showCustomerService'])
    }
}
function CustomerService({
    showMod  
}) {
    const connectRef = useRef(false);//记录连接成功
    const containerRef = useRef();//聊天信息容器
    const pageRef = useRef(1);//记录历史聊天下一页将是第几页,当值设为-1时代表 没有更多的历史信息了
    const [inputValue, setInputValue] = useState("")
    const [content, setContent] = useState({data:[],isscroll:false})//isscroll 区分是否滚动的方式加载出数据，决定回显数据后滚动条位置
    const {data,isscroll} = content;
    const [bigImg, setBigImg] = useState("")

    useEffect(() => {
        if(showMod && pageRef.current==1){
            console.log(111,pageRef.current)
            // pageRef.current = 1;
            getHistoryChat()
        }

        if(showMod && !ws){//开启连接
            newWebSocket();
        }else if(!showMod){//关闭连接
            closeWebsocket()

        }

    }, [showMod])

    //聊天内容变化处理滚动条：非滚动加载的内容 滚动到最底端；滚动加载完成向下滚动240px的内容
    useEffect(() => {
        if(data.length>0){
            let scrolltop = containerRef.current.scrollHeight;
            if(isscroll){
                scrolltop = 240;
            }
            containerRef.current.scrollTop = scrolltop;
        }
    }, [data,isscroll])

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
            if(onemsg.code=="3002"){
                Notification({
                    type: 'warn',
                    description: '已在其他地方上线，被迫下线...'
                })
                switchOpen()
            }else if(onemsg.code=="3001"){
                Notification({
                    type: 'warn',
                    description: '非法登录'
                })
                switchOpen()
            }else{
                setContent( ({data}) => ({data:[ ...data, onemsg ],isscroll:false}))
            }
        };
        ws.onclose = (e) =>{//检测到断开连接
            console.log("---断开连接----",e)
            clearInterval(wsTimer);
            ws = null;
            if ( connectRef.current && e.code == '1006') {//如果异常断开，尝试重连
                setTimeout(newWebSocket,5000);
            }else if ( e.code == '1007') {//多点登录
                Notification({
                    type: 'warn',
                    description: '已在其他地方上线，被迫下线...'
                })
                switchOpen()
            }
            connectRef.current = false;
            
        }
    }
    //获取一页历史消息
    const getHistoryChat= ()=>{
        post(Paths.customerServiceHistory,{
            pageIndex: pageRef.current,
            pageRows:pagerows
        }).then(({data={}}) => {
            data.list || []
            let list = data.list || [], 
                len = list.length,
                isscroll = pageRef.current>1;
            if(len<pagerows){
                pageRef.current = -1
                if(len==0){
                    return;
                }
            }else{
                pageRef.current += 1;
            }
            setContent( ({data}) => ({data:[ ...list.reverse(), ...data ],isscroll}))
        });

    }

    const switchOpen=()=>{
        let newShow = !showMod;
        store.dispatch(showCustomerService(newShow));
        
    }
    const sendHandle = ()=>{
        if(inputValue && /[\S]/.test(inputValue)){
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
        setInputValue(e.target.value.replace(/[\r\n]/g, ""))
    }
    //滚动加载历史消息
    const scrolHandle = ()=>{
        if(containerRef.current.scrollTop==0 && pageRef.current>0){
            getHistoryChat()
        }
    }

    const imgChang = e=>{
        e = e || window.event;
        let target = e.target,
            file = target.files[0];
        if(!file) return false;
        if(!CheckUpFile(target)) return false;
        UpFileToCloud(file,(src)=>{
            console.log(1111,src)
            if(ws){
                ws.send(sendMsg(`_img_${src}`))
            }else{
                Notification({
                    // type: 'warn',
                    description: '连线中......'
                })
            }
        })
        
    }
    
    return <>
        <div className="customer-service comm-shadowbox" style={{display:showMod?'flex':'none'}}>
            <div className='tit'>客服<span className="close" onClick={switchOpen}> </span></div>
            <div className='content'  ref={containerRef} onScrollCapture={scrolHandle} >
                {
                    data.map(({message='',senderName,time},index)=>{
                        let isimg = '';
                        if(message.indexOf('_img_')==0){
                            isimg = message.slice(5)
                        }
                        return <div className={`onechat ${senderName=='客服'?'left':'right'}`}  key={index+'_'+time} >
                            { isimg ? <img className='img' src={isimg} onClick={ ()=>setBigImg(isimg)} /> :  
                                    <span className='bubble'>{message}</span> 
                            }
                            <span className='time'>{DateTool.formatDate(time,'MM-dd hh:mm:ss',8)}</span>
                        </div>

                    })
                }
            </div>
            <div className='inputbox'>
                <label className='upimgbtn' htmlFor='up'></label>
                
                <input className='file' id='up' type='file'
                  data-format='gif,jpeg,jpg,png' data-maxsize={1024} onChange={imgChang}
                  accept='.gif,.jpeg,.jpg,.png'
                />

                <span className='sendbtn' onClick={sendHandle}>发送</span>
                <Input.TextArea className='textarea' showCount placeholder="请输入您的问题..." bordered={false} maxLength={200}
                    value={inputValue}
                    onChange={changeInput}
                    onPressEnter={sendHandle}
                />
            </div>
        </div>
        <div className='customer-service-switch-show' onClick={switchOpen}> </div>
        {
            bigImg && <div onClick={()=>setBigImg("")} className="showbigimg-maskbox" title="点击关闭" > <img src={bigImg}/></div>
        }


        
    </>
}

export default connect(mapStateToProps, null)(CustomerService)
