import React, { useEffect, useState } from 'react'
import { Modal, Table, Tabs } from 'antd';
import { post, Paths, get } from '../../../api';
import './detail.scss'
const { TabPane } = Tabs;
export default function ProtocolDelete({ rightVisible, onCloseRight, id }) {
    const [data, setData] = useState({ devicePushDataConfList: [] })
    const [oldTable, setOldTable] = useState([])
    const [oldEvent, setOldEvent] = useState([])//勾选的老设备事件
    useEffect(() => {
        getDetail()
    }, [])
    const getDetail = () => {
        let url = Paths.subscribeDetail + '?urlConfId=' + id
        post(url).then((res) => {
            setData(res.data)
            // let eventIds = res.data.eventIds.split(',').map(item => {
            //     return Number(item)
            // })
            // eventChange(eventIds)
            // get(Paths.getsubscribeProduct, { productId: res.data.productId }).then((res) => {
            //     setOldTable(res.data.productFuncList || [])
            // });
        });

    }
    const columns = [
        {
            title: '数据名称',
            dataIndex: 'propertyName',
        },
        {
            title: '数据标识',
            dataIndex: 'property',
        },
        {
            title: '数据属性',
            dataIndex: 'propertyValueDesc',
        },
    ];
    //获取table数据
    const getOldData = (val) => {
        let n = ''
        switch (val) {
            case 9:
                n = '运行数据'
                break;
            case 10:
                n = '控制数据'
                break;
            case 11:
                n = '故障数据'
                break;
            case 12:
                n = '配置数据'
                break;
            default:
                return ''
        }
        if (!oldTable.length) return []
        let currentData = oldTable.find(item => {
            if (item.dataTypeName == n) {
                return item
            }
        })
        if (!currentData) return []
        let ori = data.productFuncList || {}
        let obj = {
            9: ori.runningList || [],
            11: ori.errorList || [],
            12: ori.configList || [],
            10: ori.controllList || [],
        }

        let arr = currentData.list.filter(item => {
            if (obj[val].indexOf(item.property) > -1) {
                return item
            }
        })
        return arr
    }
    //获取tab标题
    const getTitle = val => {
        let n = ''
        switch (val) {
            case 9:
                n = '运行数据'
                break;
            case 10:
                n = '控制数据'
                break;
            case 11:
                n = '故障数据'
                break;
            case 12:
                n = '配置数据'
                break;
            default:
                return ''
        }
        return n
    }
    //===事件勾选
    const eventChange = (val) => {
        let arr = [9, 10, 11, 12]
        let arr2 = []
        val.forEach(item => {
            if (arr.includes(item)) {
                arr2.push(item)
            }
        })
        setOldEvent(arr2)
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
                    {/* {
                        oldEvent.length ? <Tabs defaultActiveKey="1" >
                            {
                                oldEvent.map(item => {
                                    return <TabPane key={item} tab={getTitle(item)}>
                                        <Table
                                            columns={columns} dataSource={getOldData(item)}
                                            rowKey='property' pagination={false} scroll={{ y: 240 }} />
                                    </TabPane>
                                })
                            }
                        </Tabs> : null
                    } */}

                    <div className='subscrbe-t' style={{ marginTop: '22px' }}>订阅方式</div>
                    {
                        data.pushWay === 2 && <>
                            <div className='subscrbe-item'>
                                <div className='item-label'>主题：</div>
                                <div className='item-value'>{data.topic}</div>
                            </div>
                            <div className='subscrbe-item'>
                                <div className='item-label'>账号：</div>
                                <div className='item-value'>{data.username}</div>
                            </div>
                            <div className='subscrbe-item'>
                                <div className='item-label'>密码：</div>
                                <div className='item-value'>{data.password}</div>
                            </div></>
                    }
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
                        <div className='item-value'>{data.pushFrequency === 2 ? '每次触发推送' : '相同故障每小时推送1次'}</div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}