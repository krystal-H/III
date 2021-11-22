import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Modal, Button, Tabs, Table, Input, Select, Divider, Form } from 'antd';
import { post, Paths } from '../../../../../api';
import { DateTool } from '../../../../../util/util'
import ActionConfirmModal from '../../../../../components/action-confirm-modal/ActionConfirmModal'
import { Notification } from '../../../../../components/Notification';
import { cloneDeep } from 'lodash'
function InfoModal({ baseInfo, projectId }, ref) {
    const [form] = Form.useForm();
    const [typelist, setTypelist] = useState([])
    const [deletevisible, setDeletevisible] = useState(false)
    const [delType, setDelType] = useState('singer')
    const [selectedKey, setSelectedKey] = useState([])
    const [actionData, setActionData] = useState({})
    const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 10 }) //分页
    const [dataSource, setDataSource] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)
    const columns = [
        {
            title: '设备ID',
            dataIndex: 'deviceUniqueId',
            key: 'deviceUniqueId',
        },
        {
            title: '所属产品',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: '绑定来源',
            dataIndex: 'bindSource',
            key: 'bindSource',
        }, {
            title: '绑定时间',
            dataIndex: 'bindTime',
            key: 'bindTime',
            render(bindTime) {
                return bindTime && DateTool.utcToDev(bindTime);
            }

        }, {
            title: '状态',
            dataIndex: 'onlineStatus',
            key: 'onlineStatus',
            render(onlineStatus) {
                return onlineStatus == 1 ? '在线' : '离线';
            }
        }, {
            title: '所属分组',
            dataIndex: 'groupName',
            key: 'groupName',
        }, {
            title: '操作',
            dataIndex: '',
            key: '',
            render(text, record) {
                return <span>
                    {record.bindSource && record.bindSource.indexOf('导入') > -1 &&
                        <><a onClick={() => { openDel('singer', record) }}>移除绑定</a><Divider type="vertical" /></>}

                    <a onClick={() => { openEdit(record) }}>编辑组</a></span>
            }
        },
    ];
    useEffect(() => {
        if (baseInfo.accountId) {
            getList()
        }
    }, [pager.pageIndex, projectId, baseInfo.accountId])
    useEffect(() => {
        getTypeList()
    }, [])
    //
    const getTypeList = () => {
        post(Paths.getThirdCategory).then((res) => {
            setTypelist(res.data)
        });
    }
    const deletelOKHandle = () => {
        if (delType == 'singer') {
            let params = {
                deviceUniqueId: actionData.deviceUniqueId,
                userId: baseInfo.accountId
            }
            post(Paths.projectRemoveDev, params, { loading: true }).then((res) => {
                Notification({
                    type: 'success',
                    description: '操作成功！',
                });
                setDeletevisible(false)
                getList()
            });
        } else {
            let params = {
                deviceUniqueIds: selectedKey,
                projectId
            }
            post(Paths.projectDelDev, params, { loading: true }).then((res) => {
                Notification({
                    type: 'success',
                    description: '操作成功！',
                });
                setDeletevisible(false)
                getList()
            });
        }
    }
    //搜索
    const onSearch = () => {
        if (pager.pageIndex == 1) {
            getList()
        } else {
            setPager(pre => {
                let obj = cloneDeep(pre)
                obj.pageIndex = 1
                return obj
            })
        }
    }
    const getList = (loading = true) => {
        let formVal = form.getFieldsValue()
        let params = {
            ...pager,
            projectId,
            userId: baseInfo.accountId,
            ...formVal
        }
        post(Paths.projectInfoDevlist, params, { loading }).then((res) => {
            setDataSource(res.data.list)
            setSelectedKey([])
            setPager(pre => {
                let obj = cloneDeep(pre)
                obj.totalRows = res.data.pager.totalRows
                return obj
            })
        });
    }
    //打开删除
    const openDel = (type, data) => {
        setDelType(type)
        if (type == 'singer') {
            setActionData(data)
        } else {
            if (!selectedKey.length) {
                Notification({
                    type: 'warn',
                    description: '请先勾选要删除的设备',
                });
                return
            }
        }
        setDeletevisible(true)
    }
    //勾选
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedKey(selectedRowKeys)
        },
        onSelect: (record, selected, selectedRows) => {
            // console.log(record, selected, selectedRows);
        },
        selectedRowKeys: selectedKey
    };
    // 翻页
    const pagerChange = (pageIndex, pageRows) => {
        setPager(pre => {
            return Object.assign(cloneDeep(pre), { pageIndex: pageRows === pager.pageRows ? pageIndex : 1, pageRows })
        })
    }
    //打开编辑
    const openEdit = (data) => {
        setActionData(data)
        setIsModalVisible(true)
    }
    //取消编辑
    const cancelModel = () => {
        setIsModalVisible(false)
    }
    //编辑成功
    const updateInfo = () => {
        setIsModalVisible(false)
        getList()
    }
    useImperativeHandle(ref, () => ({
        reFresh: getList
    }));
    return (
        <div >
            <div className='device-info-wrap'>
                <div className='filter'>
                    <Form form={form} layout='inline' >
                        <Form.Item name="batchName" label='批次名称'>
                            <Input style={{ width: '190px' }} placeholder="请输入批次名称" />
                        </Form.Item>
                        <Form.Item name="productId" label='产品类型'>
                            <Select
                                style={{ width: '200px' }}
                                allowClear
                            >
                                {
                                    typelist.map(item => {
                                        return (<Select.Option value={item.deviceTypeId} key={item.deviceTypeId}>{item.deviceTypeName}</Select.Option>)
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item name="groupName" label='所属分组'>
                            <Input style={{ width: '190px' }} placeholder="请输入分组名称" />
                        </Form.Item>
                        <Form.Item
                            label='设备ID'
                        >
                            <Form.Item
                                name='deviceUniqueIdParams'
                                noStyle
                            >
                                <Input style={{ width: '190px' }} placeholder="输入设备ID" />
                            </Form.Item>
                            <Button type="primary" onClick={onSearch}>
                                查询
                            </Button>
                        </Form.Item>
                    </Form>

                </div>
                <div className='content'>
                    <div className='action'>
                        <span>{`已选择${selectedKey.length}项`}</span>
                        <Divider type="vertical" style={{ borderColor: '#333' }} />
                        <a onClick={() => { openDel('many') }}>删除</a>
                    </div>
                    <Table dataSource={dataSource} columns={columns} rowKey="deviceUniqueId" rowSelection={{ ...rowSelection }}
                        pagination={{
                            defaultCurrent: 1,
                            current: pager.pageIndex,
                            pageSize: pager.pageRows,
                            total: pager.totalRows,
                            showSizeChanger: false,
                            showQuickJumper: pager.totalPages > 5,
                            onChange: pagerChange,
                            showTotal: total => <span>共 <a>{total}</a> 条</span>
                        }} />
                </div>
            </div>
            {
                deletevisible &&
                <ActionConfirmModal
                    visible={deletevisible}
                    modalOKHandle={deletelOKHandle}
                    modalCancelHandle={() => setDeletevisible(false)}
                    title={delType == 'singer' ? '解除绑定' : '删除'}
                    needWarnIcon={true}
                    tipText={delType == 'singer' ? '确认解除绑定？' : '确定批量删除？'}
                >
                </ActionConfirmModal>
            }
            {
                isModalVisible && <EditGroup isModalVisible={isModalVisible} cancelModel={cancelModel}
                    updateInfo={updateInfo} actionData={actionData} projectId={projectId} />
            }
        </div>
    )
}
export default forwardRef(InfoModal)
function EditGroup({ isModalVisible, cancelModel, updateInfo, actionData, projectId }) {
    const [form] = Form.useForm();
    const [typelist, setTypelist] = useState([])
    useEffect(() => {
        getTypeList()
    }, [])
    const getTypeList = () => {
        post(Paths.projectGroupList, { projectId }).then((res) => {
            setTypelist(res.data)
        });
    }
    const subData = () => {
        form.validateFields().then(val => {
            let params = {
                deviceId: actionData.deviceId,
                groupId: val.groupId
            }
            post(Paths.projectupdateGroup, params).then((res) => {
                Notification({
                    type: 'success',
                    description: '编辑成功！',
                });
                updateInfo()
            });
        })
    }
    return <div>
        <Modal title="编辑组" visible={isModalVisible} onOk={subData} onCancel={cancelModel} width='550px' wrapClassName='add-protocols-wrap'>
            <div style={{ padding: '0 80px' }} className='project-import-file-wrap'>
                <Form form={form} labelAlign='right' initialValues={{groupId:actionData.groupId}} labelCol={{
                    span: 6,
                }}
                    wrapperCol={{
                        span: 18,
                    }}>
                    <Form.Item
                        label="设备ID"
                        rules={[{ required: true }]}
                    ><span>{actionData.deviceUniqueId}</span>
                    </Form.Item>
                    <Form.Item
                        label="所属产品"
                        rules={[{ required: true }]}
                    ><span>{actionData.productName}</span>
                    </Form.Item>
                    <Form.Item
                        label="所属分组"
                        name='groupId'
                        rules={[{ required: true }]}
                    >
                        <Select
                            style={{ width: '200px' }}
                        >
                            {
                                typelist.map(item => {
                                    return (<Select.Option value={item.groupId} key={item.groupId}>{item.groupName}</Select.Option>)
                                })
                            }
                        </Select>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    </div>
}