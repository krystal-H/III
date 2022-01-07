import React, { useEffect, useState } from 'react'
import { Modal, Table } from 'antd';
import { post, Paths, get } from '../../../api';
import './detail.scss'
export default function ProtocolDelete({ rightVisible, onCloseRight, id }) {
    const [data, setData] = useState({ devicePushDataConfList: [] })
    useEffect(() => {
        getDetail()
    }, [])
    const getDetail = () => {
        let url = Paths.subscribeDetail + '?urlConfId=' + id
        post(url).then((res) => {
            setData(res.data)
        });
    }
    return (
        <Modal maskClosable={false} title="订阅详情" footer={false} visible={rightVisible} onOk={onCloseRight} onCancel={onCloseRight} width='900px'>
            <div className='subscrbe-info'>
                <div className='subscrbe-c'>
                    <div className='subscrbe-t'>订阅对象</div>
                    <div className='subscrbe-item'>
                        <div className='item-label'>订阅名称：</div>
                        <div className='item-value'>{data.subscriptName}</div>
                    </div>
                    <div className='subscrbe-item'>
                        <div className='item-label'>类型：</div>
                        <div className='item-value'>{data.subscriptType === 1 ? '项目' : '产品'}</div>
                    </div>
                    {
                        data.subscriptType === 1 && <div className='subscrbe-item'>
                            <div className='item-label'>项目：</div>
                            <div className='item-value'>{data.projectName}</div>
                        </div>
                    }
                    <div className='subscrbe-item'>
                        <div className='item-label'>归属产品：</div>
                        <div className='item-value'>{data.productName}</div>
                    </div>
                    {/* <div className='subscrbe-item'>
                        <div className='item-label'>订阅设备：</div>
                        <div className='item-value'>{data.subscription}</div>
                    </div> */}
                    <div className='subscrbe-t'>配置数据</div>
                    <div className='subscrbe-item'>
                        <div className='item-label'>设备事件：</div>
                        <div className='item-value'>{data.eventList && data.eventList.join('，')}</div>
                    </div>
                    <div className='subscrbe-item'>
                        <div className='item-label'>业务时间：</div>
                        <div className='item-value'>{data.businessTime}</div>
                    </div>
                    <div className='subscrbe-t' style={{ marginTop: '22px' }}>订阅方式</div>
                    <div className='subscrbe-item'>
                        <div className='item-label'>订阅方式：</div>
                        <div className='item-value'>{data.pushWay === 1 ? 'API数据PUSH形式' : 'MQTT主题订阅'}</div>
                    </div>
                    {
                        data.pushWay === 1 && <>
                            <div className='subscrbe-item'>
                                <div className='item-label'>数据订阅URL：</div>
                                <div className='item-value'>{data.pushUrl}</div>
                            </div>
                            <div className='subscrbe-item'>
                                <div className='item-label'>Token：</div>
                                <div className='item-value'>{data.sign}</div>
                            </div></>
                    }
                    <div className='subscrbe-item'>
                        <div className='item-label'>推送频次：</div>
                        <div className='item-value'>{data.pushFrequency === 0 ? '每次触发推送' : '相同故障每小时推送1次'}</div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}