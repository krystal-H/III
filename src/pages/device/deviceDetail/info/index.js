import React, { useState, useEffect } from 'react'
import { Descriptions, Divider, Icon } from 'antd';
import { post, Paths, get } from '../../../../api';
import { strToAsterisk, DateTool } from '../../../../util/util';
import LabelVisible from '../../../../components/form-com/LabelVisible';
import './index.scss'
export default function DeviceInfo({ devceId }) {
    const [data, setData] = useState({})
    useEffect(() => {
        getDetail()
    }, [])
    const getDetail = (loading = true) => {
        post(Paths.getDeviceInfo, { 'deviceId': devceId }, { loading }).then((res) => {
            setData(res.data)
        });
    }
    //过滤函数
    const fliterFn = (value) => {
        let result = null
        if (typeof value == 'number') {
            result = value == 1 ? '网关设备' : '普通设备'
        }
        return result
    }
    return (<div id='device-info'>
        <Descriptions title="设备信息">
            <Descriptions.Item label="设备ID">{data.deviceUniqueId}</Descriptions.Item>
            <Descriptions.Item label="设备秘钥">
                <span>
                    <LabelVisible label={data.deviceSecret} tip="点击复制" copy={true} />
                </span>
            </Descriptions.Item>
            <Descriptions.Item label="物理地址">{data.deviceMac}</Descriptions.Item>

            <Descriptions.Item label="入网时间">{data.connectTime}</Descriptions.Item>
            <Descriptions.Item label="模组固件版本">{data.moduleVersion}</Descriptions.Item>
            <Descriptions.Item label="MCU固件版本">{data.pcbVersion}</Descriptions.Item>

            <Descriptions.Item label="绑定网关">{data.gateWay}</Descriptions.Item>
            <Descriptions.Item label="设备名称">{data.deviceName}</Descriptions.Item>
            <Descriptions.Item label="设备位置">{data.deviceSite}</Descriptions.Item>

            <Descriptions.Item label="绑定C端用户">{data.bindCUser}</Descriptions.Item>
            <Descriptions.Item label="SIM卡号">{data.simNumber}</Descriptions.Item>
            <Descriptions.Item label="IMEI">{data.deviceIdentifier}</Descriptions.Item>
        </Descriptions>
        <Divider />
        <Descriptions title="产品信息">
            <Descriptions.Item label="产品名称">{data.productName}</Descriptions.Item>
            <Descriptions.Item label="产品ID">{data.productId}</Descriptions.Item>
            <Descriptions.Item label="所属分类">{data.productType}</Descriptions.Item>

            <Descriptions.Item label="产品类型">{fliterFn(data.productClass)}</Descriptions.Item>
            <Descriptions.Item label="产品编码">{data.productCode}</Descriptions.Item>
            <Descriptions.Item label="产品密钥">
                <span>
                    <LabelVisible label={data.productKey} tip="点击复制" copy={true} />
                </span>
            </Descriptions.Item>

        </Descriptions>
    </div>)
}