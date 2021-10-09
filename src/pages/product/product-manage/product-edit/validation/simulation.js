import React, { useEffect, useState, useRef } from 'react'
import { Modal, Table,Button } from 'antd';
import {get, post, Paths} from '../../../../../api';
import DescWrapper from '../../../../../components/desc-wrapper/DescWrapper';
export default ({ productId }) => {

    const [mockId, setMockId] = useState("213456789");


    const startDebug = ()=>{

    }

    useEffect(() => {
        console.log(12345467)
        // const product = JSON.parse(sessionStorage.getItem('productItem'));
        // const { code } = product;
        post(Paths.getMockDeviceId,{productId},{loading:true}).then(({data={}})=>{
            setMockId(data.id)
            newWebSocket()
        })
    }, [])

    // useEffect(() => {
    //     console.log("----serverToken---",serverToken)
    //     if(serverToken){
    //         newWebSocket();
    //     }
    // }, [mockId])

    //建立一个 ws 连接
    const newWebSocket = ()=> {

        let wsProtocol = 'wss:';
        let httpProtocol = window.location.protocol;
            wsProtocol = httpProtocol.replace(/https?/, 'wss');
        ws = new WebSocket(wsProtocol + '//' + serverIp);
        
        
        ws.onopen = ()=> {//连接成功
            mountRef.current = 0
            setWebSocketStatu(1);
            clearInterval(wsTimer);
            wsTimer = setInterval(()=>{ ws.send('') }, 5000); //告诉服务器“请保持联系”
            const product = JSON.parse(sessionStorage.getItem('productItem'));
            const {deviceTypeId,deviceSubtypeId,productVersion} = product;
            console.log(333,deviceSubtypeId,product)

            const senmsg = `[${serverToken}|${developerInfo.userId}|${deviceTypeId}#${deviceSubtypeId}#${productVersion}|${debugInfo[0]}|${debugInfo[1]}]`;  
            ws.send(senmsg);

        };
        ws.onmessage =  (data)=> {//接收到消息
            mountRef.current += 1;
            toDataList(data.data || "{}")
            
        };
        ws.onclose = (e) =>{//检测到断开连接
            console.log("检测到断开连接",mountRef.current)
            setWebSocketStatu(0);
            clearInterval(wsTimer);
            if (mountRef.current>-1 && e.code == '1006') {//如果异常断开，尝试重连
                setTimeout(getAccessToken,5000);
            }
            ws = null;
            mountRef.current = -1
        }
    }


    return (
    <div>
        <DescWrapper style={{ marginBottom: 8, width: '100%' }} desc={['WiFi蓝牙设备需先登录数联智能App，并搜索绑定需要调试的设备，蜂窝设备不需要。']}></DescWrapper>
        <div className="sim-devid">虚拟设备ID：{mockId}</div>
        <div className="modtit">模拟设备</div>
        <div className='debug-data-box'>
            <div className='databox'></div>
            <Button type='primary' onClick={ we => {}}>上报</Button>
            <div className='h5page'></div>
            <div className='codeimg'>
                <p>请使用“数联智能”app，扫描<br/>以下二维码，模拟数据下发。</p>
                <img src="" />
            </div>
        </div>
        <div className="modtit">通信日志</div>
        <div className="logbox">

        </div>




    </div>)

}

