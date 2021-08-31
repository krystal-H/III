import React, { useState, useEffect } from 'react';
import { Modal, Button, Tabs, Table, Input, Select, Checkbox, Form, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import DescWrapper from '../../../../../components/desc-wrapper/DescWrapper';
import ActionConfirmModal from '../../../../../components/action-confirm-modal/ActionConfirmModal';
import NewModal from './newModal'
import './changeModal.scss'
import { post, Paths, get } from '../../../../../api';
import { Notification } from '../../../../../components/Notification';

const { TabPane } = Tabs;


export default function ChangeModal({ isChangeModalVisible, closeChange, CancelChange }) {

    const callback = (key) => {
        console.log(key);
    }
    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    // const data = [];

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
    const relData = (data) => {
        alert(1)
    }
    //标准面板选项
    //tab3
    const [data, setData] = useState([])
    const [actionVis, setActionVis] = useState(false)
    const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 10 })
    const [actionData, setActionData] = useState({})
    //确定删除
    const delOkCancel = () => {
        setActionVis(false)
    }
    //取消删除
    const delCancel = () => {
        setActionVis(false)
    }
    //删除
    const openDel = (data) => {
        setActionData(data)
        setActionVis(true)
    }
    const getList = () => {
        post(Paths.panelList, { productId: 11791 }).then((res) => {
            setData(res.data.list)
            setPager(pre => {
                let obj = JSON.parse(JSON.stringify(pre))
                return Object.assign(obj, { totalRows: res.data.pager.totalRows })
            })
        });
    }
    useEffect(() => {
        getList()
    }, [pager.pageIndex, pager.pageRows])
    const columns = [
        {
            title: 'APP ID',
            dataIndex: 'projectId',
            key: 'projectId',
        },
        {
            title: '产品名称',
            dataIndex: 'projectName',
            key: 'projectName',
        },
        {
            title: '最新修改时间',
            dataIndex: 'modifyTime',
            key: 'modifyTime',
        },
        {
            title: '状态',
            key: 'verifyStatus',
            dataIndex: 'verifyStatus',
            render: (text, record) => {
                let arr = ['待审核', '已通过', '不通过', '审核中']
                return arr[text]
            }
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a>发布</a>
                    <a>灰度调试</a>
                    <a onClick={() => { openDel(record) }}>删除</a>
                </Space>
            ),
        },
    ];
    return (
        <div >
            <Modal title="更换面板" visible={isChangeModalVisible} onOk={closeChange} onCancel={CancelChange} width='952px' wrapClassName='add-protocols-wrap'
            footer={''}>
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
                                            <Button type='primary' ghost onClick={() => { relData }}>发布</Button>
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
                                        <Table rowKey='did' dataSource={data} columns={columns} pagination={false} />
                                    </div>
                                </div>

                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </Modal>
            {isAddModalVisible && <NewModal isAddModalVisible={isAddModalVisible} closeAdd={closeAdd} CancelAdd={CancelAdd}></NewModal>}
            <ActionConfirmModal
                visible={actionVis}
                modalOKHandle={delOkCancel}
                modalCancelHandle={delCancel}
                title='删除'
                descText={`即将${actionData.projectName}`}
            />
        </div>
    )
}