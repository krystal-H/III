import React, { useState, useEffect } from 'react';
import { Table, Input, InputNumber,  Form, Typography, Button, Space } from 'antd';
import { post, Paths, get } from '../../../../api';
import DelModal from './actionOp'
import './index.scss'
import { Notification } from '../../../../components/Notification'
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
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input maxLength={50}/>;
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
    const [editingKey, setEditingKey] = useState('');
    const [delLabelId, setDelLabelId] = useState(null)
    const isEditing = (record) => record.id === editingKey;
    const [cloudUpdateVisible, setCloudUpdateVisible] = useState(false) // 删除
    useEffect(() => {
        if(devceId){
            getDetail()
        }
    }, [devceId])
    // table操作-发布、删除、下线
    const operateHandle = (type, id) => {
        setCloudUpdateVisible(true)
        setDelLabelId(id)
        setOperate(type)
    }

    // 删除弹框确定
    const updateOkHandle = () => {
        post(Paths.deleteDeviceLabel, { labelId: delLabelId }).then((res) => {
            setCloudUpdateVisible(false)
            Notification({
                type: 'success',
                description: '删除成功！'
            })
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
        row.deviceId = devceId
        post(Paths.addDeviceLabel, row, { loading }).then((res) => {
            setEditingKey('');
            Notification({
                type: 'success',
                description: '新增成功！'
            })
            getDetail()
        }).catch(err => {
            setEditingKey('');
            getDetail()
        });
    }
    //编辑请求
    const editReq = (row, loading = true) => {
        row.deviceId = devceId
        post(Paths.updateDeviceLabel, row, { loading }).then((res) => {
            setEditingKey('');
            Notification({
                type: 'success',
                description: '编辑成功！'
            })
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
                row.labelId = itemData.id
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
                        <Typography.Link disabled={editingKey !== ''} onClick={() => { operateHandle(2, record.id) }}>
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
    //请求标签详情
    const getDetail = (loading = true) => {
        post(Paths.getDeviceLabelList, { 'deviceId': devceId }, { loading }).then((res) => {
            setData(res.data.list)
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
                cloudUpdateVisible &&
                <DelModal
                    visible={cloudUpdateVisible}
                    operate={operate}
                    updateOkHandle={() => updateOkHandle()}
                    updateCancelHandle={() => close()} />
            }
        </div>
    );
};
