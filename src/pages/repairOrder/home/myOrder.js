import React, { useState, useEffect } from 'react'
import { Tabs, Radio, Table, Drawer, Button, Divider } from 'antd';
const { TabPane } = Tabs;
import { post, Paths, get } from '../../../api';
export default function DeviceShadow() {
    const [visible, setVisible] = useState(false);
    const [tableData, setTableData] = useState([
    ])
    const [hasRead, setHasRead] = useState(false)
    const [detailInfo, setDetailInfo] = useState({})
    const onClose = () => {
        setVisible(false);
    };
    const lookDetail = (id) => {
        getDetail(id)
        setVisible(true)
    }
    const columns = [
        {
            title: '订阅号',
            dataIndex: 'workOrderId',
            key: 'workOrderId',
        },
        {
            title: '问题分类',
            dataIndex: 'age',
            key: 'age',
            render: (text, record) => (
                <span>
                    {record.problemTypeOneName} - {record.problemTypeTwoName}
                </span>
            ),
        },
        {
            title: '提交时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '工单状态',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (
                <span>
                    {text ? '已回复' : '未回复'}
                </span>
            ),
        },
        {
            title: '操作',
            dataIndex: 'address',
            key: 'address',
            render: (text, record) => (
                <span>
                    <a onClick={() => { lookDetail(record.workOrderId) }}>查看</a>
                </span>
            ),
        },
    ]
    const getList = (load = true) => {
        post(Paths.WorkOrderList, {}, { load }).then((res) => {
            setTableData(res.data.list)
        });
    }
    const getDetail = (id) => {
        post(Paths.WorkOrderDetail, { workOrderId: id }).then((res) => {
            setDetailInfo(res.data)
        });
    }
    useEffect(() => {
        getList()
    }, [])
    return (<div id='order-home-self'>
        <Table dataSource={tableData} columns={columns} rowKey='workOrderId' />
        <Drawer
            title="工单详情"
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
            width={470}
        >
            <div className='my-order-detail'>
                <div className='order-item'>
                    <div className='order-item-label'>问题分类：</div>
                    <div className='order-item-text'>{detailInfo.problemTypeOneName}-{detailInfo.problemTypeTwoName}
                        <span className='order-item-span' style={{ color: detailInfo.status ? '#15C054' : '#2F78FF' }}>{detailInfo.status ? '已回复' : '待回复'}</span>
                    </div>
                </div>
                <div className='order-item'>
                    <div className='order-item-label'>提交时间：</div>
                    <div className='order-item-text'>{detailInfo.createTime}</div>
                </div>
                <div className='order-item'>
                    <div className='order-item-label'>问题描述：</div>
                    <div className='order-item-text'>{detailInfo.problemDesc}</div>
                </div>
                <div className='order-item'>
                    <div className='order-item-label'>上传问题图片/视频：</div>
                    <div className='order-item-text'>
                        {
                            detailInfo.image && detailInfo.image.split(',').map((item,index)=>{
                                return <img key={index}/>
                            })
                        }
                    </div>
                </div>
                <div className='order-item'>
                    <div className='order-item-label'>联系方式：</div>
                    <div className='order-item-text'>{detailInfo.phone}</div>
                </div>
                {
                    detailInfo.status == 1 ? (<div className='order-feedback'>
                        <div style={{ margin: '0 -24px' }}>
                            <Divider />
                        </div>
                        <div className='feedback-title'>回复详情：</div>
                        <div className='feedback-dec'>
                            {detailInfo.replyContent}
                        </div>
                    </div>) : null
                }

            </div>
        </Drawer>
    </div>)
}