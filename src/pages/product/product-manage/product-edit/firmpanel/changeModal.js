import React, { useState, useEffect } from 'react';
import { Modal, Button, Tabs, Table, Input, Select, Checkbox, Form, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './changeModal.scss';
const { TabPane } = Tabs;
const columns = [
    {
        title: 'APP ID',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: '产品名称',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '最新修改时间',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '状态',
        key: 'tags',
        dataIndex: 'tags',
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a>发布</a>
                <a>灰度调试</a>
                <a>删除</a>
            </Space>
        ),
    },
];
export default function AddFuncModal({ isChangeModalVisible, closeChange, CancelChange }) {
    const formItemLayout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            span: 16, offset: 8
        },
    };
    useEffect(() => {
    }, [])
    const callback = (key) => {
        console.log(key);
    }
    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];
    return (
        <div >
            <Modal title="更换面板" visible={isChangeModalVisible} onOk={closeChange} onCancel={CancelChange} width='952px' wrapClassName='add-protocols-wrap'>
                <div>
                    <div className='GrayModal-top'>
                    </div>
                    <div className='GrayModal-tab'>
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab="标准面板" key="1"> </TabPane>
                            <TabPane tab="自由配置面板" key="2">
                                Content of Tab Pane 2
                            </TabPane>
                            <TabPane tab="自定义开发上传" key="3">
                                <div className='change-modal-tab3'>
                                    <div className='change-modal-tab3-dec'>
                                        <div>通过clife提供的一系列开发工具包，便捷的开发调试出最具品牌风格的面板，适用于自定义开发方案。<a>下载开发工程包</a></div>
                                        <div>均不满足，需要委托定制？直接联系Clife。<a>提交工单</a></div>
                                    </div>
                                    <div className='change-modal-tab3-top'>
                                        <div>面板版本</div>
                                        <Button type='primary'>新增</Button>
                                    </div>
                                    <div>
                                        <Table columns={columns} dataSource={data} />
                                    </div>
                                </div>

                            </TabPane>
                        </Tabs>
                    </div>
                </div>

            </Modal>
        </div>
    )
}