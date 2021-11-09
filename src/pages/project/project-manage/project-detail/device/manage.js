import React, { useState, useEffect } from 'react';
import { Modal, Button, Tabs, Table, Input, Select, Divider, Form } from 'antd';
import { post, Paths } from '../../../../../api';
import ActionConfirmModal from '../../../../../components/action-confirm-modal/ActionConfirmModal'
import FileModel from './importFile'
import { data } from '_browserslist@4.16.6@browserslist';
export default function InfoModal() {
    const [form] = Form.useForm();
    const [typelist, setTypelist] = useState([])
    const [addVisible, setAddVisible] = useState(false)
    const [deletevisible, setDeletevisible] = useState(false)
    const [delType, setDelType] = useState('singer')
    const [selectedKey, setSelectedKey] = useState([])
    const [actionData, setActionData] = useState({})
    const [fileVisible, setFileVisible] = useState(false) //导入文件
    const [infoVisible, setInfoVisible] = useState(false) //详情
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
            title: '批次名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '创建时间',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '导入成功数量',
            dataIndex: '',
            key: '',
        }, {
            title: '操作',
            dataIndex: '',
            key: '',
            render(text, record) {
                return <span><a onClick={() => { openDia(record) }}>查看详情</a></span>
            }
        },
    ];
    const deletelOKHandle = () => { }
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
    const openImport = () => {
        setFileVisible(true)
    }
    //
    const cancelFile = () => {
        setFileVisible(false)
    }
    //
    const closeFile = () => {
        setFileVisible(false)
    }
    //详情
    const openDia = (data) => {
        setActionData(data)
        setInfoVisible(true)
    }
    const closeInfo = () => {
        setInfoVisible(false)
    }
    return (
        <div >
            <div className='device-info-wrap'>
                <div className='top-but'>
                    <Button type="primary" onClick={openImport}>
                        导入设备
                    </Button>
                </div>
                <div className='filter'>
                    <Form form={form} layout='inline' >
                        <Form.Item
                            label='批次名称'
                        >
                            <Form.Item
                                name='name'
                                noStyle
                            >
                                <Input style={{ width: '190px' }} placeholder="请输入批次名称" />
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
                    <Table dataSource={dataSource} columns={columns} rowKey="key" rowSelection={{ ...rowSelection }} />
                </div>
            </div>
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
            {
                fileVisible && <FileModel isModalVisible={fileVisible} colseMoadl={closeFile} cancelModel={cancelFile} />
            }
            {
                <DetailInfo isModalVisible={infoVisible} colseMoadl={closeInfo} />
            }
        </div>
    )
}
function DetailInfo({ isModalVisible, colseMoadl }) {
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
            title: '批次名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '物理地址',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '设备ID',
            dataIndex: '',
            key: '',
        }, {
            title: '设备IMEI',
            dataIndex: '',
            key: '',
        }
    ];
    return <div>
        <Modal title="查看详情" footer={null} visible={isModalVisible} onCancel={colseMoadl} width='804px' wrapClassName='add-protocols-wrap'>
            <div>
                <Table dataSource={dataSource} columns={columns} scroll={{ y: 440 }} rowKey="key" pagination={null} />
            </div>
        </Modal>
    </div>
}