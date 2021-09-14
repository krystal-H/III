import React, { useState, useEffect } from 'react';
import { Modal, Button, Tabs, Table, Input, Select, Checkbox, Form, Space } from 'antd';
import { useHistory } from 'react-router-dom';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import NewModal from './newModal'
import TestModal from './test'
import EditModal from './editModal'
import './changeModal.scss'
import { post, Paths, get } from '../../../../../api';
import { Notification } from '../../../../../components/Notification';
import GrayDebugg from './grayDebugg'
import ActionModel from './actionModel'
import { cloneDeep } from "lodash";
import RelPanModel from './relPanel'
import { typed } from '../../../../../components/CodeView/jshint';
import { async } from '_rxjs@6.6.7@rxjs';

const { TabPane } = Tabs;


export default function ChangeModal({ isChangeModalVisible, closeChange, CancelChange, defaultTab = '1' }) {
    let productId = 0
    if (sessionStorage.getItem('productItem')) {
        productId = JSON.parse(sessionStorage.getItem('productItem')).productId
    }
    const history = useHistory();
    //切换tab
    const callback = (key) => {
        // console.log(key);
    }
    const [actionType, setActionType] = useState(0)
    const [actionData, setActionData] = useState({})
    //去工单
    const goOrder = () => {
        history.push('/open/repairOrder');
    }
    const [actionVis, setActionVis] = useState(false) //操作弹窗展示
    //列表
    const [standard, setStandard] = useState([]) //标准
    const [data, setData] = useState([]) //自定义列表
    const getList = async () => {
        let arr1 = [], arr2 = [], ids = []
        let res1 = await post(Paths.panelList, { productId })
        res1.data.list.forEach(item => {
            item.status = getPanelStatus(item)
            if (item.panelType == 3) {
                arr2.push(item)
            }
            if (item.panelType == 1) {
                arr1.push(item)
                ids.push(item.templateId)
            }
        })
        setData(arr2)
        let res2 = await post(Paths.standardPanelList, { productId, templateIds: ids })
        res2.data.forEach(item => {
            item.status = '模板'
        })
        setStandard(arr1.concat(res2.data).splice(0, 3))
    }
    //新增自定义==============
    const [isAddModalVisible, setIsAddModalVisible] = useState(false)
    const openAdd = () => {
        setIsAddModalVisible(true)
    }
    const closeAdd = () => {
        getList()
        setIsAddModalVisible(false)
    }
    const CancelAdd = () => {
        setIsAddModalVisible(false)
    }
    //编辑自定义==============
    const [iseditModalVisible, setIseditModalVisible] = useState(false)
    const closeEdit = () => {
        getList()
        setIseditModalVisible(false)
    }
    const CancelEdit = () => {
        setIseditModalVisible(false)
    }
    const openEdit = (data) => {
        setActionData(data)
        setIseditModalVisible(true)
    }
    //========================
    //标准面板选项
    //tab3



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
            productId,
            projectId: actionData.projectId,
            status: 1,
            appId: 1
        }
        post(Paths.modelRel, params).then((res) => {
            Notification({
                type: 'success',
                description: '提交发布成功！'
            })
            setActionVis(false)
            getList()
        });
    }
    //确定下线
    const offOkLine = () => {
        let params = {
            productId,
            projectId: actionData.projectId,
        }
        post(Paths.panelOffLine, params).then((res) => {
            Notification({
                type: 'success',
                description: '下线成功！'
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
    const openDel = (data1, type) => {
        let data = cloneDeep(data1)
        if (type == 4) {
            data.projectName = data.templateName
        }
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
        getList()
        Notification({
            type: 'success',
            description: '灰度调试成功！'
        })
        setIsGrayModalVisible(false)
    }
    //打开灰度
    const openDebugg = (data) => {
        setActionData(data)
        setIsGrayModalVisible(true)
    }
    //使用
    const useModel = () => {
        let params = {
            productId,
            filePath: actionData.filePath,
            projectType: 1,
            projectName: actionData.templateName,
            templateId: actionData.templateId,
            page1: actionData.page1,
            panelType: 1
        }
        post(Paths.cusSavePanel, params).then((res) => {
            getList()
            Notification({
                type: 'success',
                description: '提交使用成功！',
            });
            setActionVis(false)
        });
    }
    //发布
    const [relPanVis, setRelPanVis] = useState(false)
    //打开发布==============
    const openRel = (data) => {
        setActionData(data)
        setRelPanVis(true)
    }
    const CancelRel = () => {
        setRelPanVis(false)
    }
    const closeOkRel = () => {
        Notification({
            type: 'success',
            description: '发布成功！'
        })
        getList()
        setRelPanVis(false)
    }
    useEffect(() => {
        getList()
    }, [])
    //操作判断
    const updateOkHandle = () => {
        if (actionType === 1) {
            relOkAc()
        } else if (actionType === 2) {
            delOkCancel()
        } else if (actionType === 3) {
            offOkLine()
        } else if (actionType === 4) {
            useModel()
        }
    }
    //回显自定义列表按钮
    const getBtn = (record, status) => {
        if (status == '草稿') {
            return (<Space size="middle">
                <a onClick={() => { openDebugg(record) }}>灰度调试</a>
                <a onClick={() => { openDel(record, 2) }}>删除</a>
                <a onClick={() => { openEdit(record) }}>编辑</a>
            </Space>)
        }
        if (status == '已发布') {
            return (<Space size="middle">
                <a onClick={() => { openDel(record, 3) }}>下线</a>
            </Space>)
        }
        if (status == '调试中') {
            return (<Space size="middle">
                <a onClick={() => { openDebugg(record) }}>灰度调试</a>
                <a onClick={() => { openDel(record, 2) }}>删除</a>
                {/* <a onClick={() => { openEdit(record) }}>编辑</a> */}
                <a onClick={() => { openRel(record) }}>发布</a>
            </Space>)
        }
        return ''
        // if (!isGray && verifyStatus != 1) {
        //     return (<Space size="middle">
        //         <a onClick={() => { openDebugg(record) }}>灰度调试</a>
        //         <a onClick={() => { openDel(record, 2) }}>删除</a>
        //         <a onClick={() => { openEdit(record) }}>编辑</a>
        //     </Space>)
        // }
        // if (verifyStatus == 0 || verifyStatus == 2) {
        //     return (<Space size="middle">
        //         <a onClick={() => { openDebugg(record) }}>灰度调试</a>
        //         <a onClick={() => { openDel(record, 2) }}>删除</a>
        //         <a onClick={() => { openEdit(record) }}>编辑</a>
        //         <a onClick={() => { openRel(record) }}>发布</a>
        //     </Space>)
        // }
        // if (verifyStatus == 1) {
        //     return <a onClick={() => { openDel(record, 3) }}>下线</a>
        // }
        // if (verifyStatus == 3) {
        //     return <a onClick={() => { openRel(record) }}>发布</a>
        // }
    }
    //回显标准面板按钮
    const getStandardBtn = (record, status) => {
        if (status == '模板') {
            return (<div >
                <Button onClick={() => { openDel(record, 4) }} type='primary'>使用</Button>
            </div>)
        }
        if (status == '草稿') {
            return (<div >
                <Button onClick={() => { openDebugg(record) }} type='primary'>灰度调试</Button>
            </div>)
        }
        if (status == '调试中') {
            return (<div >
                <Button onClick={() => { openDebugg(record) }} type='primary'>灰度调试</Button>
                <Button onClick={() => { openRel(record, 1) }} type='primary'>发布</Button>
            </div>)
        }
        if (status == '已发布') {
            return (<div >
                <Button onClick={() => { openDel(record, 3) }} type='primary'>下线</Button>
            </div>)
        }
        return ''
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
                return record.status
            }
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                // let { verifyStatus, isGray } = record;
                // `verify_status` int(10) unsigned NOT NULL DEFAULT '1' COMMENT '审核状态：0 -待审核 1- 已通过 2-不通过 3-审核中',
                return getBtn(record, record.status)
            },
        },
    ];

    //测试数据
    const [testVis, setTestVis] = useState(false)
    const closeTest = () => {
        setTestVis(false)
    }
    const CancelTest = () => {
        setTestVis(false)
    }
    //获取面板状态
    const getPanelStatus = (data) => {
        let { projectStatus, verifyStatus, htmlShow, isGray } = data
        if (projectStatus == 0 && verifyStatus == 0 && isGray == 0) {
            return '草稿'
        }
        if (projectStatus == 1 && isGray == 1) {
            return '调试中'
        }
        if (projectStatus == 1 && verifyStatus == 1 && isGray == 0 && htmlShow == 1) {
            return '已发布'
        }
        if (projectStatus == 1 && verifyStatus == 3 && isGray == 0 && htmlShow == 0) {
            return '审核中'
        }
        if (projectStatus == 1 && verifyStatus == 0 && isGray == 0 && htmlShow == 0) {
            return '已下线'
        }
    }
    return (
        <div >
            <Modal title="更换面板" visible={isChangeModalVisible} onOk={closeChange} onCancel={CancelChange} width='952px'
                wrapClassName='add-protocols-wrap' footer={null}>
                <div>
                    <div className='GrayModal-tab'>
                        <Tabs defaultActiveKey={defaultTab} onChange={callback}>
                            <TabPane tab="标准面板" key="1">
                                <div className='change-modal-tab1'>
                                    <div className='change-modal-tab3-dec'>
                                        <div>clife推荐的快速控制面板，既拿既用，一键开发，快速支持硬件的识别，适用于快速开发方案。</div>
                                        <div>均不满足，需要委托定制？直接联系Clife。<a onClick={goOrder}>提交工单</a></div>
                                        {/* <Button type='primary' onClick={() => { setTestVis(true) }}>新增</Button> */}
                                    </div>
                                    <div className='model-arr-wrap'>
                                        {
                                            standard.map((item, index) => {
                                                return (
                                                    <div className='model-arr-wrap-item' key={index}>
                                                        <div className='model-arr-wrap-item-content'>
                                                            <div className='model-status'>{item.status}</div>
                                                            <img src={item.page1} alt='' />
                                                        </div>
                                                        <div className='model-arr-wrap-item-btn'>
                                                            <span className='model-arr-wrap-item-title-name'> {item.status == '模板' ? item.templateName : item.projectName}</span>
                                                            {
                                                                getStandardBtn(item, item.status)
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
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
                                        <Table rowKey='projectId' dataSource={data} columns={columns} pagination={false} />
                                    </div>
                                </div>

                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </Modal>
            {
                isAddModalVisible && <NewModal isAddModalVisible={isAddModalVisible} closeAdd={closeAdd} CancelAdd={CancelAdd}></NewModal>
            }
            {/* 编辑 */}
            {
                iseditModalVisible && <EditModal actionObj={actionData} isAddModalVisible={iseditModalVisible} closeAdd={closeEdit} CancelAdd={CancelEdit} />
            }
            {/* 灰度 */}
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
            {/* 发布 */}
            {
                relPanVis && <RelPanModel actionObj={actionData} relPanVis={relPanVis} CancelRel={CancelRel} closeOkRel={closeOkRel} />
            }
            {/* {
                testVis && <TestModal isAddModalVisible={testVis} closeAdd={closeTest} CancelAdd={CancelTest} />
            } */}
        </div>
    )
}