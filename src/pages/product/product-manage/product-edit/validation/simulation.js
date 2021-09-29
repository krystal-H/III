import React, { useEffect, useState, useRef } from 'react'
import { Modal, Table,Button } from 'antd';
import {get, post, Paths} from '../../../../../api';
import { DateTool } from '../../../../../util/util';
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
        })
    }, [])


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




    </div>)

}

