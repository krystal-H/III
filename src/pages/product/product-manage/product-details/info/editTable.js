import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Button, Space } from 'antd';
import ActionConfirmModal from '../../../../../components/action-confirm-modal/ActionConfirmModal';
import { post, Paths, get } from '../../../../../api';

// import DelModal from './actionOp'
import './index.scss'

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                        style: '100%'
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export default function EditableTable({ devceId }) {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [operate, setOperate] = useState(null)
    const [delData, setDelData] = useState({})
    const [editingKey, setEditingKey] = useState('');
    const [delLabelId, setDelLabelId] = useState(null)
    const isEditing = (record) => record.id === editingKey;
    const [cloudUpdateVisible, setCloudUpdateVisible] = useState(false) // 删除
    const { pathname } = useLocation();
    // console.log(pathname,'===')
    useEffect(() => {
        getDetail()
    }, [])
    // table操作-发布、删除、下线
    const operateHandle = (data) => {
        setDelData(data)
        setCloudUpdateVisible(true)
    }

    // 删除弹框确定
    const updateOkHandle = () => {
        post(Paths.getPublishProductLabelDel, { id: delData.id }).then((res) => {
            setCloudUpdateVisible(false)
            getDetail()
        });

    }

    // 删除 弹框取消
    const close = () => {
        setCloudUpdateVisible(false)
    }
    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            age: '',
            ...record,
        });
        setEditingKey(record.id);
    };
    //新增请求
    const addReq = (row, loading = true) => {
        let id=pathname.split('/').slice(-1)
        row.targetid = 1
        row.labelType = 1
        post(Paths.getPublishProductLabelAdd, row, { loading }).then((res) => {
            setEditingKey('');
            getDetail()
        }).catch(err => {
            setEditingKey('');
            getDetail()
        });
    }
    //编辑请求
    const editReq = (row, loading = true) => {
        // row.deviceId = devceId
        post(Paths.getPublishProductLabelEdit, row, { loading }).then((res) => {
            setEditingKey('');
            getDetail()
        }).catch(err => {
            setEditingKey('');
            getDetail()
        });
    }
    const save = async (itemData) => {
        try {
            const row = await form.validateFields();
            if (itemData.id) {
                row.id = itemData.id
                editReq(row)
            } else {
                addReq(row)
            }

        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    //新增
    const handleEv = () => {
        let coutinueAc = false
        if (editingKey) {
            coutinueAc = true
        }
        data.map(item => {
            if (!item.id) {
                coutinueAc = true
            }
        })
        if (coutinueAc) {
            return
        }
        let datas = JSON.parse(JSON.stringify(data))
        let item = {
            key: `${datas.length + 1}`,
            labelKey: ``,
            labelValue: '',
            id: 0
        }
        datas.push(item)
        setData(datas)
        edit(item)
    }
    const columns = [
        {
            title: '标签Key',
            dataIndex: 'labelKey',
            editable: true,
        },
        {
            title: '标签Value',
            dataIndex: 'labelValue',
            editable: true,
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <a
                            onClick={() => save(record)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            保存
                        </a>
                    </span>
                ) : (
                    <Space>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            编辑
                        </Typography.Link>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => { operateHandle(record) }}>
                            删除
                        </Typography.Link>
                    </Space>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    //请求标签列表
    const getDetail = (loading = true) => {
        post(Paths.getPublishProductLabelList, { 'targetid': 1 }, { loading }).then((res) => {
            setData(res.data)
        });
    }
    return (
        <div id='device-tag'>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    rowKey='id'
                    pagination={false}
                />
            </Form>
            <Button type="primary" ghost className='edit-table-btn' onClick={() => { handleEv() }}>添加标签</Button>
            {
                cloudUpdateVisible && <ActionConfirmModal
                    visible={cloudUpdateVisible}
                    modalOKHandle={updateOkHandle}
                    modalCancelHandle={close}
                    targetName={delData.funcName}
                    title='删除'
                    descGray={true}
                    needWarnIcon={true}
                    descText='确定删除此功能'
                ></ActionConfirmModal>
            }

        </div>
    );
};
