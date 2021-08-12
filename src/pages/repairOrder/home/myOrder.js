import React, { useState, useEffect } from 'react'
import { Tabs, Radio, Table, Drawer, Button, Divider } from 'antd';
const { TabPane } = Tabs;
import { post, Paths, get } from '../../../api';
export default function DeviceShadow() {
    const [visible, setVisible] = useState(false);
    const [tableData, setTableData] = useState([
    ])
    const [hasRead, setHasRead] = useState(false)
    const onClose = () => {
        setVisible(false);
    };
    const lookDetail = () => {
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
        },
        {
            title: '操作',
            dataIndex: 'address',
            key: 'address',
            render: (text, record) => (
                <span>
                    <a onClick={lookDetail}>查看</a>
                </span>
            ),
        },
    ]
    const getList = (load = true) => {
        post(Paths.WorkOrderList, {}, { load }).then((res) => {
            setTableData(res.data.list)
        });
    }
    useEffect(() => {
        getList()
    }, [])
    return (<div id='order-home-self'>
        <Table dataSource={tableData} columns={columns} rowKey='workOrderId'/>
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
                    <div className='order-item-text'>产品接入问题-新增品类问题
                        <span className='order-item-span' style={{ color: hasRead ? '#15C054' : '#2F78FF' }}>{hasRead ? '已回复' : '待回复'}</span>
                    </div>
                </div>
                <div className='order-item'>
                    <div className='order-item-label'>提交时间：</div>
                    <div className='order-item-text'>产品接入问题-新增品类问题</div>
                </div>
                <div className='order-item'>
                    <div className='order-item-label'>问题描述：</div>
                    <div className='order-item-text'>这是提交的工单详细内容描述相关内容描述相关内容描述相关这是提交的工单详细内容描述相关内容描述相关内容描述相关这是提交的工单详细内容描述相关内容描述相关内容描述相关这是提交的工单详细内容描述相关内容描述相关内容描述相关这是提交的工单详细内容描述相关内容描述相关内容描述相关这是提交的工单详细内容描述相关内容描述</div>
                </div>
                <div className='order-item'>
                    <div className='order-item-label'>上传问题图片/视频：</div>
                    <div className='order-item-text'>产品接入问题-新增品类问题</div>
                </div>
                <div className='order-item'>
                    <div className='order-item-label'>联系方式：</div>
                    <div className='order-item-text'>产品接入问题-新增品类问题</div>
                </div>
                <div className='order-feedback'>
                    <div style={{ margin: '0 -24px' }}>
                        <Divider />
                    </div>
                    <div className='feedback-title'>回复详情：</div>
                    <div className='feedback-dec'>
                        clife平台回复的内容文字。。clife平台回复的内容文字。。clife平台回复的内容文字。。clife平台回复的内容文字。。clife平台回复的内容文字。。clife平台回复的内容文字。。clife平台回复的内容文字。。clife平台回复的内容文字。。clife平台回复的内容文字。
                    </div>
                </div>

            </div>
        </Drawer>
    </div>)
}