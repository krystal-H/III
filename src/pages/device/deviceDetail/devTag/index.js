import React, { useState, useEffect, useCallback } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Button, Space } from 'antd';
import './index.scss'
const originData = [];

for (let i = 0; i < 5; i++) {
    originData.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}

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
                        style:'100%'
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

export default function EditableTable({}) {
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    useEffect(() => {
        getDetail()
    }, [])
    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            age: '',
            ...record,
        });
        setEditingKey(record.key);
    };
    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    //新增
    const handleEv = () => {
        if (editingKey) {
            return
        }
        let datas = JSON.parse(JSON.stringify(data))
        let item = {
            key: `${datas.length + 1}`,
            name: `面对疾风吧`,
            age: 9999,
        }
        datas.push(item)
        setData(datas)
        edit(item)
    }
    const columns = [
        {
            title: '标签Key',
            dataIndex: 'name',
            editable: true,
        },
        {
            title: '标签Value',
            dataIndex: 'age',
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
                            href="#!"
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            保存
                        </a>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a href="#!">取消</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Space>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            编辑
                        </Typography.Link>
                        <Typography.Link disabled={editingKey !== ''}>
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
    const getDetail=(loading = true)=>{
        post(Paths.getDeviceInfo, {'deviceId':devceId}, { loading }).then((res) => {
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
                    pagination={false}
                />
            </Form>
            <Button type="primary" ghost className='edit-table-btn' onClick={() => { handleEv() }}>添加标签</Button>
        </div>
    );
};
