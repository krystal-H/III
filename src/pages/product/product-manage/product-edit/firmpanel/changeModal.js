import React, { useState, useEffect } from 'react';
import { Modal, Button, Tabs, Table, Input, Select, Checkbox, Form, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import DescWrapper from '../../../../../components/desc-wrapper/DescWrapper';
import NewModal from './newModal'
import './changeModal.scss'
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
export default function ChangeModal({ isChangeModalVisible, closeChange, CancelChange }) {
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
    //新增面板
    const [isAddModalVisible, setIsAddModalVisible] = useState(false)
    const closeAdd = () => {
        setIsAddModalVisible(false)
    }
    const CancelAdd = () => {
        setIsAddModalVisible(false)
    }
    const openAdd = () => {
        setIsAddModalVisible(true)
    }
    //标准面板选项

    return (
        <div >
            <Modal title="更换面板" visible={isChangeModalVisible} onOk={closeChange} onCancel={CancelChange} width='952px' wrapClassName='add-protocols-wrap'>
                <div>
                    <div className='GrayModal-top'>
                        <DescWrapper style={{ marginBottom: 8, width: '100%' }} desc={['请先下线已发布面板，再重新选择面板']}></DescWrapper>
                    </div>
                    <div className='GrayModal-tab'>
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab="标准面板" key="1">
                                <div className='change-modal-tab1'>
                                    <div className='change-modal-tab3-dec'>
                                        <div>clife推荐的快速控制面板，既拿既用，一键开发，快速支持硬件的识别，适用于快速开发方案。</div>
                                        <div>均不满足，需要委托定制？直接联系Clife。<a>提交工单</a></div>
                                    </div>
                                    <div className='model-arr-wrap-item'>
                                        <div className='model-arr-wrap-item-title'>
                                            <span className='model-arr-wrap-item-title-name'> 面板1</span>
                                            <Button type='primary' ghost>发布</Button>
                                        </div>
                                        <div className='model-arr-wrap-item-content'>

                                        </div>
                                    </div>
                                </div>
                            </TabPane>
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
                                        <Button type='primary' onClick={openAdd}>新增</Button>
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
            {isAddModalVisible && <NewModal isAddModalVisible={isAddModalVisible} closeAdd={closeAdd} CancelAdd={CancelAdd}></NewModal>}
        </div>
    )
}