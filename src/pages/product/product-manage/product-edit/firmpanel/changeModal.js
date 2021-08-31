import React, { useState, useEffect } from 'react';
import { Modal, Button, Tabs, Table, Input, Select, Checkbox, Form, Space } from 'antd';
import { useHistory } from 'react-router-dom';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import NewModal from './newModal'
import './changeModal.scss'
import { post, Paths, get } from '../../../../../api';
import { Notification } from '../../../../../components/Notification';
import GrayDebugg from './grayDebugg'
import ActionModel from './actionModel'

const { TabPane } = Tabs;


export default function ChangeModal({ isChangeModalVisible, closeChange, CancelChange }) {
    const history = useHistory();
    const callback = (key) => {
        console.log(key);
    }
    const [actionType, setActionType] = useState(0)
    const [actionData, setActionData] = useState({})
    //去工单
    const goOrder = () => {
        history.push('/open/repairOrder');
    }
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
    //发布
    const relData = (data) => {
        alert(1)
    }
    //标准面板选项
    //tab3
    const [data, setData] = useState([])
    const [actionVis, setActionVis] = useState(false)
    const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 10 })
    //
    const getList = () => {
        post(Paths.panelList, { productId: 11791 }).then((res) => {
            setData(res.data.list)
            setPager(pre => {
                let obj = JSON.parse(JSON.stringify(pre))
                return Object.assign(obj, { totalRows: res.data.pager.totalRows })
            })
        });
    }
    //确定删除
    const delOkCancel = () => {
        post(Paths.delPanel, { projectId: actionData.projectId }).then((res) => {
            Notification({
                type: 'success',
                description: '删除成功！'
            })
            setActionVis(false)
            getList()
        });
    }
    //确定发布
    const relOkAc = () => {
        let params = {
            productId: 11791,
            projectId: actionData.projectId,
            status: 1,
            appId: 1
        }
        post(Paths.modelRel, params).then((res) => {
            Notification({
                type: 'success',
                description: '发布成功！'
            })
            setActionVis(false)
            getList()
        });
    }
    //取消
    const closeAction = () => {
        setActionVis(false)
    }
    //删除
    const openDel = (data, type) => {
        setActionData(data)
        setActionType(type)
        setActionVis(true)
    }
    //灰度
    //灰色测试
    const [isGrayModalVisible, setIsGrayModalVisible] = useState(false);
    //取消灰度
    const CancelDebugg = () => {
        setIsGrayModalVisible(false)
    }
    //更新灰度
    const closeDebugg = () => {
        setIsGrayModalVisible(false)
    }
    //打开灰度
    const openDebugg = (data) => {
        setActionData(data)
        setIsGrayModalVisible(true)
    }

    useEffect(() => {
        getList()
    }, [pager.pageIndex, pager.pageRows])
    const updateOkHandle = () => {
        if (actionType === 1) {
            relOkAc()
        } else if (actionType === 2) {
            delOkCancel()
        } else if (actionType === 3) {

        }
    }
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
                    <a onClick={() => { openDel(record, 1) }}>发布</a>
                    <a onClick={() => { openDebugg(record) }}>灰度调试</a>
                    <a onClick={() => { openDel(record, 2) }}>删除</a>
                </Space>
            ),
        },
    ];
    return (
        <div >
            <Modal title="更换面板" visible={isChangeModalVisible} onOk={closeChange} onCancel={CancelChange} width='952px'
                wrapClassName='add-protocols-wrap' footer={null}>
                <div>
                    <div className='GrayModal-tab'>
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab="标准面板" key="1">
                                <div className='change-modal-tab1'>
                                    <div className='change-modal-tab3-dec'>
                                        <div>clife推荐的快速控制面板，既拿既用，一键开发，快速支持硬件的识别，适用于快速开发方案。</div>
                                        <div>均不满足，需要委托定制？直接联系Clife。<a onClick={goOrder}>提交工单</a></div>
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
                            {/* <TabPane tab="自由配置面板" key="2">
                                Content of Tab Pane 2
                            </TabPane> */}
                            <TabPane tab="自定义开发上传" key="3">
                                <div className='change-modal-tab3'>
                                    <div className='change-modal-tab3-dec'>
                                        <div>通过clife提供的一系列开发工具包，便捷的开发调试出最具品牌风格的面板，适用于自定义开发方案。<a>下载开发工程包</a></div>
                                        <div>均不满足，需要委托定制？直接联系Clife。<a onClick={goOrder}>提交工单</a></div>
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
            {
                isAddModalVisible && <NewModal isAddModalVisible={isAddModalVisible} closeAdd={closeAdd} CancelAdd={CancelAdd}></NewModal>}
            {
                isGrayModalVisible && <GrayDebugg actionObj={actionData} isGrayModalVisible={isGrayModalVisible} closeDebugg={closeDebugg} CancelDebugg={CancelDebugg}></GrayDebugg>
            }
            {
                actionVis && <ActionModel
                    visible={actionVis}
                    operate={actionType}
                    actionObj={actionData}
                    updateOkHandle={() => updateOkHandle()}
                    updateCancelHandle={() => closeAction()} />
            }
        </div>
    )
}