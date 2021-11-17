import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Button, Space } from 'antd';
import ActionConfirmModal from '../../../../../components/action-confirm-modal/ActionConfirmModal';
import { post, Paths, get } from '../../../../../api';
import { Notification } from '../../../../../components/Notification';

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
                            message: `请输入IP地址`,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export default function EditableTable({ projectId }) {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [operate, setOperate] = useState(null)
    const [delData, setDelData] = useState({})
    const [editingKey, setEditingKey] = useState('');
    const [delLabelId, setDelLabelId] = useState(null)
    const isEditing = (record) => record.whiteListId === editingKey;
    const [cloudUpdateVisible, setCloudUpdateVisible] = useState(false) // 删除
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
        post(Paths.projectWhiteDel, { whiteListId: delData.whiteListId }).then((res) => {
            Notification({
                type: 'success',
                description: '删除成功！',
            });
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
            value: '',
            ...record,
        });
        setEditingKey(record.whiteListId);
    };
    //新增请求
    const addReq = (row, loading = true) => {
        post(Paths.projectWhiteSave, row, { loading }).then((res) => {
            Notification({
                type: 'success',
                description: '新增成功！',
            });
            setEditingKey('');
            getDetail()
        }).catch(err => {
            setEditingKey('');
            getDetail()
        });
    }
    //编辑请求
    const editReq = (row, loading = true) => {
        post(Paths.projectWhiteSave, row, { loading }).then((res) => {
            Notification({
                type: 'success',
                description: '保存成功！',
            });
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
            row.projectId = projectId
            if (itemData.whiteListId) {
                row.whiteListId = itemData.whiteListId
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
            if (!item.whiteListId) {
                coutinueAc = true
            }
        })
        if (coutinueAc) {
            return
        }
        let datas = JSON.parse(JSON.stringify(data))
        let item = {
            key: `${datas.length + 1}`,
            value: ``,
            whiteListId: 0
        }
        datas.push(item)
        setData(datas)
        edit(item)
    }
    const columns = [
        {
            title: 'IP地址',
            dataIndex: 'value',
            width: 300,
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
    const getDetail = () => {
        post(Paths.projectWhiteList, { projectId }).then((res) => {
            setData(res.data)
        });
    }
    return (
        <div >
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
                    rowKey='whiteListId'
                    pagination={false}
                />
            </Form>
            <Button type="primary" ghost className='edit-table-btn' onClick={() => { handleEv() }}>新增IP</Button>
            {
                cloudUpdateVisible && <ActionConfirmModal
                    visible={cloudUpdateVisible}
                    modalOKHandle={updateOkHandle}
                    modalCancelHandle={close}
                    targetName={delData.funcName}
                    title='删除'
                    descGray={true}
                    needWarnIcon={true}
                    descText='确定删除此白名单'
                ></ActionConfirmModal>
            }
        </div>
    );
};
