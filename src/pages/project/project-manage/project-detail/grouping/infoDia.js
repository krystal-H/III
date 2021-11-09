import React, { useState, useEffect } from 'react';
import { Modal, Button, Tabs, Table, Input, Select, Divider, Form } from 'antd';
import { post, Paths } from '../../../../../api';
import ActionConfirmModal from '../../../../../components/action-confirm-modal/ActionConfirmModal'
export default function InfoModal({ ModalVisible, closeOk, onCancel }) {
    const [form] = Form.useForm();
    const [typelist, setTypelist] = useState([])
    const [addVisible, setAddVisible] = useState(false)
    const [deletevisible, setDeletevisible] = useState(false)
    const [delType, setDelType] = useState('singer')
    const [selectedKey, setSelectedKey] = useState([])
    const [actionData, setActionData] = useState({})
    const dataSource = [
        {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
        },
        {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        },
    ];
    const columns = [
        {
            title: '设备ID',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '所属产品',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '绑定来源',
            dataIndex: '',
            key: '',
        }, {
            title: '绑定时间',
            dataIndex: '',
            key: '',
        }, {
            title: '状态',
            dataIndex: '',
            key: '',
        }, {
            title: '操作',
            dataIndex: '',
            key: '',
            render(text, record) {
                return <a onClick={() => { openDel('singer', record) }}>从分组中删除</a>
            }
        },
    ];
    const deletelOKHandle =()=>{}
    //搜索
    const onSearch = () => {
        let params = {
            deviceTypeId: form.getFieldValue('proId'),
            eq: true,
            productId: productItem.productId,
            funcName: form.getFieldValue('name')
        }
        post(Paths.PhysicalModelList, params).then((res) => {
            setOtherData(delaData(res.data))
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
    return (
        <div >
            <Modal title="分组详情" visible={ModalVisible} onOk={closeOk} onCancel={onCancel} width='1204px' wrapClassName='add-protocols-wrap'>
                <div className='project-info-wrap'>
                    <div className='top'>
                        <Form form={form} layout='inline' >
                            <Form.Item name="proId" label='产品类型'>
                                <Select
                                    style={{ width: '200px' }}
                                >
                                    {
                                        typelist.map(item => {
                                            return (<Option value={item.deviceTypeId} key={item.deviceTypeId}>{item.deviceTypeName}</Option>)
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label='设备ID'
                            >
                                <Form.Item
                                    name='name'
                                    noStyle
                                >
                                    <Input style={{ width: '205px' }} placeholder="输入功能点名称" />
                                </Form.Item>
                                <Button type="primary" onClick={onSearch}>
                                    查询
                                </Button>
                            </Form.Item>
                        </Form>
                        <Button type="primary" onClick={openAdd}>
                            新增设备到分组
                        </Button>
                    </div>
                    <div className='content'>
                        <div className='action'>
                            <span>{`已选择${selectedKey.length}项`}</span>
                            <Divider type="vertical" style={{ borderColor: '#333' }} />
                            <a onClick={()=>{openDel('many')}}>删除</a>
                        </div>
                        <Table dataSource={dataSource} columns={columns} scroll={{ y: 440 }} rowKey="key" rowSelection={{ ...rowSelection }} />
                    </div>
                </div>
            </Modal>
            {
                addVisible && <AddDevice addVisible={addVisible} closeAdd={closeAdd} confirmAdd={confirmAdd} />
            }
            {
                deletevisible &&
                <ActionConfirmModal
                    visible={deletevisible}
                    modalOKHandle={deletelOKHandle}
                    modalCancelHandle={() => setDeletevisible(false)}
                    targetName={actionData.taskName}
                    title={'删除分组'}
                    needWarnIcon={true}
                    descText={'即将删除的分组'}
                    tipText={'删除的信息，无法找回，请谨慎操作'}
                >
                </ActionConfirmModal>
            }
        </div>
    )
}
function AddDevice({ addVisible, closeAdd, confirmAdd }) {
    const [form] = Form.useForm();
    const [typelist, setTypelist] = useState([])
    const dataSource = [
        {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
        },
        {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        },
    ];
    const columns = [
        {
            title: '设备ID',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '所属产品',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '绑定来源',
            dataIndex: '',
            key: '',
        }, {
            title: '绑定时间',
            dataIndex: '',
            key: '',
        }, {
            title: '状态',
            dataIndex: '',
            key: '',
        }
    ];
    const onSearch = () => {

    }
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
    };
    return <div>
        <Modal title="添加设备到分组" visible={addVisible} onOk={closeAdd} onCancel={confirmAdd} width='804px' wrapClassName='add-protocols-wrap'>
            <div>
                <div className='top'>
                    <Form form={form} layout='inline' >
                        <Form.Item name="proId" label='产品类型'>
                            <Select
                                style={{ width: '200px' }}
                            >
                                {
                                    typelist.map(item => {
                                        return (<Option value={item.deviceTypeId} key={item.deviceTypeId}>{item.deviceTypeName}</Option>)
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='设备ID'
                        >
                            <Form.Item
                                name='name'
                                noStyle
                            >
                                <Input style={{ width: '205px' }} placeholder="输入功能点名称" />
                            </Form.Item>
                            <Button type="primary" onClick={onSearch}>
                                查询
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div>
                    <Table dataSource={dataSource} columns={columns} scroll={{ y: 440 }} rowKey="key" rowSelection={{ ...rowSelection }} />
                </div>
            </div>
        </Modal>
    </div>
}