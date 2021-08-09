import React, { useState,useEffect } from 'react'
import { Descriptions, Divider } from 'antd';
import { post, Paths, get } from '../../../../api';
import './index.scss'
export default function DeviceInfo({devceId}) {
    const [data,setData]=useState({})
    useEffect(()=>{
        getDetail()
    },[])
    const getDetail=(loading = true)=>{
        post(Paths.getDeviceInfo, {'deviceId':devceId}, { loading }).then((res) => {
            setData(res.data)
        });
    }
    return (<div id='device-info'>
        <Descriptions title="设备信息">
            <Descriptions.Item label="设备信息">Zhou Maomao</Descriptions.Item>
            <Descriptions.Item label="设备秘钥">1810000000</Descriptions.Item>
            <Descriptions.Item label="物理地址">Hangzhou, Zhejiang</Descriptions.Item>

            <Descriptions.Item label="入网时间">Zhou Maomao</Descriptions.Item>
            <Descriptions.Item label="模组固件版本">1810000000</Descriptions.Item>
            <Descriptions.Item label="模组固件版本">Hangzhou, Zhejiang</Descriptions.Item>

            <Descriptions.Item label="绑定网关">Zhou Maomao</Descriptions.Item>
            <Descriptions.Item label="设备名称">1810000000</Descriptions.Item>
            <Descriptions.Item label="设备位置">Hangzhou, Zhejiang</Descriptions.Item>

            <Descriptions.Item label="绑定C端用户">Zhou Maomao</Descriptions.Item>
            <Descriptions.Item label="SIM卡号">1810000000</Descriptions.Item>
            <Descriptions.Item label="IMEI">Hangzhou, Zhejiang</Descriptions.Item>
        </Descriptions>
        <Divider />
        <Descriptions title="产品信息">
            <Descriptions.Item label="产品名称">Zhou Maomao</Descriptions.Item>
            <Descriptions.Item label="产品ID">1810000000</Descriptions.Item>
            <Descriptions.Item label="所属分类">Hangzhou, Zhejiang</Descriptions.Item>

            <Descriptions.Item label="产品类型">Zhou Maomao</Descriptions.Item>
            <Descriptions.Item label="产品编码">1810000000</Descriptions.Item>
            <Descriptions.Item label="设备秘钥">Hangzhou, Zhejiang</Descriptions.Item>

        </Descriptions>
    </div>)
}