import React, { useEffect, useState } from 'react'
import { Modal, Table } from 'antd';
import { post, Paths, get } from '../../../api';
import './detail.scss'
const columns = [
    {
        title: '数据名称',
        dataIndex: 'funcName',
        key: 'funcName',
    },
    {
        title: '数据标识',
        dataIndex: 'funcIdentifier',
        key: 'funcIdentifier',
    },
    {
        title: '数据属性',
        dataIndex: 'funcType',
        key: 'funcType',
    },
];
export default function ProtocolDelete({ rightVisible, onCloseRight,id }) {
    const [data,setData]=useState({devicePushDataConfList:[]})
    useEffect(() => {
        getDetail()
    }, [])
    const getDetail=()=>{
        let url = Paths.subscribeDetail + '?urlConfId=' + id
        post(url).then((res) => {
            setData(res.data)
        });
    }
    return (
        <Modal title="远程配置任务" footer={false} visible={rightVisible} onOk={onCloseRight} onCancel={onCloseRight} width='900px'>
            <div className='subscrbe-info'>
                <div className='subscrbe-c'>
                    <div className='subscrbe-t'>订阅对象</div>
                    <div className='subscrbe-item'>
                        <div className='item-label'>订阅名称：</div>
                        <div className='item-value'>{data.subscription}</div>
                    </div>
                    <div className='subscrbe-item'>
                        <div className='item-label'>归属产品：</div>
                        <div className='item-value'>{data.productName}</div>
                    </div>
                    <div className='subscrbe-item'>
                        <div className='item-label'>订阅设备：</div>
                        <div className='item-value'>{data.subscription}</div>
                    </div>
                    <div className='subscrbe-t'>配置数据</div>
                    <Table dataSource={data.devicePushDataConfList} columns={columns} />
                    <div className='subscrbe-t' style={{marginTop:'22px'}}>订阅方式</div>
                    <div className='subscrbe-item'>
                        <div className='item-label'>订阅方式：</div>
                        <div className='item-value'>{data.pushWay ? 'MQTT主题订阅' : 'API数据PUSH形式'}</div>
                    </div>
                    <div className='subscrbe-item'>
                        <div className='item-label'>数据订阅URL：</div>
                        <div className='item-value'>{data.url}</div>
                    </div>
                    <div className='subscrbe-item'>
                        <div className='item-label'>Token：</div>
                        <div className='item-value'>{data.pushToken}</div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}