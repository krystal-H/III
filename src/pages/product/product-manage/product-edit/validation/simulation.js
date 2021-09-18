import React, { useEffect, useState, useRef } from 'react'
import { Modal, Table } from 'antd';
import { DateTool } from '../../../../../util/util';
import DescWrapper from '../../../../../components/desc-wrapper/DescWrapper';
export default ({ historyVisiable, openHistory }) => {


    const startDebug = ()=>{

    }

    useEffect(() => {
        if(historyVisiable){
            
            
        } 
    }, [historyVisiable])


    return (
    <div>
        <DescWrapper style={{ marginBottom: 8, width: '100%' }} desc={['WiFi蓝牙设备需先登录数联智能App，并搜索绑定需要调试的设备，蜂窝设备不需要。']}></DescWrapper>
        <div className="sim-devid">虚拟设备ID：{}</div>




    </div>
        )

}

