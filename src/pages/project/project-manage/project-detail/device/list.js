import React, { useState, useEffect } from 'react';
import { Modal, Button, Tabs, Table, Input, Select, Divider, Form } from 'antd';
import { post, Paths } from '../../../../../api';
import { DateTool } from '../../../../../util/util'
import ActionConfirmModal from '../../../../../components/action-confirm-modal/ActionConfirmModal'
import { cloneDeep } from 'lodash'
export default function InfoModal({ baseInfo, projectId }) {
    const [form] = Form.useForm();
    const [typelist, setTypelist] = useState([])
    const [addVisible, setAddVisible] = useState(false)
    const [deletevisible, setDeletevisible] = useState(false)
    const [delType, setDelType] = useState('singer')
    const [selectedKey, setSelectedKey] = useState([])
    const [actionData, setActionData] = useState({})
    const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 10 }) //分页
    const [dataSource, setDataSource] = useState([])
    const columns = [
        {
            title: '设备ID',
            dataIndex: 'deviceId',
            key: 'deviceId',
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
        }, {
            title: '所属分组',
            dataIndex: 'groupName',
            key: 'groupName',
        }, {
            title: '操作',
            dataIndex: '',
            key: '',
            render(text, record) {
                return <span><a onClick={() => { openDel('singer', record) }}>移除绑定</a></span>
            }
        },
    ];
    useEffect(() => {
        if (baseInfo.accountId) {
            getList()
        }
    }, [pager.pageIndex, projectId, baseInfo.accountId])
    useEffect(()=>{
        getTypeList()
    },[])
    //
    const getTypeList=()=>{
        post(Paths.getThirdCategory).then((res) => {
            setTypelist(res.data)
        });
    }
    const deletelOKHandle = () => { }
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
        }
        setDeletevisible(true)
    }
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedKey(selectedRowKeys)
        },
        onSelect: (record, selected, selectedRows) => {
            // console.log(record, selected, selectedRows);
        },
    };
    //新增
    const openAdd = () => {
        setAddVisible(true)
    }
    const confirmAdd = () => {
        setAddVisible(false)
    }
    const closeAdd = () => {
        setAddVisible(false)
    }
    // 翻页
    const pagerChange = (pageIndex, pageRows) => {
        setPager(pre => {
            return Object.assign(cloneDeep(pre), { pageIndex: pageRows === pager.pageRows ? pageIndex : 1, pageRows })
        })
    }
    return (
        <div >
            <div className='device-info-wrap'>
                <div className='top-but'>
                    <Button type="primary" onClick={openAdd}>
                        导入设备
                    </Button>
                </div>
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
                                        return (<Option value={item.deviceTypeId} key={item.deviceTypeId}>{item.deviceTypeName}</Option>)
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
                                name='deviceId'
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
                    <Table dataSource={dataSource} columns={columns} rowKey="deviceId" rowSelection={{ ...rowSelection }}
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
                    title={'解除绑定'}
                    needWarnIcon={true}
                    tipText={'确认解除绑定？'}
                >
                </ActionConfirmModal>
            }
        </div>
    )
}