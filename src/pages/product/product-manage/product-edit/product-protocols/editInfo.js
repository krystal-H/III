import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { Form, Input, Button, Checkbox, Tag, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './editInfo.scss'
export default function ProtocolDelete({ dataType }) {
    useEffect(() => {
    }, [])
    return <div className='edit-protocol-wrap'><EnumerTemp></EnumerTemp></div>
}
function BoolTemp() {
    const onFinish = (values) => {
        console.log('Success:', values);
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="功能点名称："
                name="username"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="标识符"
                name="password"
            ><span>switch</span>
            </Form.Item>
            <Form.Item
                label="数据类型："
                name="password"
            ><span>switch</span>
            </Form.Item>
            <Form.Item
                label="数据传输类型："
                name="password"
            ><span>可下发可上报</span>
            </Form.Item>
        </Form>
    )
}
function EnumerTemp() {
    const [showAdd, setShowAdd] = useState(true)
    const [tagArr, setTagArr] = useState([])
    const { Search } = Input;
    const onFinish = (values) => {
        console.log('Success:', values);
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    //添加
    const openAdd = () => {
        setShowAdd(false)
    }
    //删除tag
    const handleClose = (index) => {
        let newTag = tagArr.filter(tag => {
            return tag !== index
        })
        setTagArr(newTag)
    }
    //添加tag
    const confirmAdd = (value) => {
        setTagArr([...tagArr, value])
        setShowAdd(true)
    }
    // useEffect(() => {
    //     setTagArr(['Unremovable', 'Tag 2', 'Tag 3'])
    // }, [])
    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="功能点名称："
                name="username"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="标识符"
                name="password"
            ><span>switch</span>
            </Form.Item>
            <Form.Item
                label="数据类型："
                name="password"
            ><span>枚举型</span>
            </Form.Item>
            {/* <Form.Item
                label="枚举值"
                name="password"
            >
                <div>{
                    tagArr.map((item, index) => {
                        return (<Tag onClose={() => handleClose(item)} key={index} closable>
                            {item}
                        </Tag>)
                    })
                }
                    {
                        showAdd ? (<Button type="primary" ghost onClick={openAdd}>
                            添加
                        </Button>) : (<Search
                            allowClear
                            enterButton="确定"
                            size="middle"
                            onSearch={confirmAdd}
                        />)
                    }</div>
            </Form.Item> */}
            <Form.Item
                label="数据类型："
            >
                <div className='peotocols-enums-wrap'>
                    <div className='peotocols-enums-wrap-title'>
                        <div className='peotocols-enums-wrap-title-colomn'>参数值</div>
                        <div>-</div>
                        <div className='peotocols-enums-wrap-title-colomn'>参数描述</div>
                    </div>
                    <div>
                        <Form.List name="users">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'first']}
                                                fieldKey={[fieldKey, 'first']}
                                                rules={[{ required: true, message: 'Missing first name' }]}
                                                noStyle
                                            >
                                                <Input />
                                            </Form.Item>
                                            <span>-</span>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'last']}
                                                fieldKey={[fieldKey, 'last']}
                                                noStyle
                                                rules={[{ required: true, message: 'Missing last name' }]}
                                            >
                                                <Input  />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            新加
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </div>
                </div>
            </Form.Item>
            <Form.Item
                label="数据传输类型："
                name="password"
            ><span>可下发可上报</span>
            </Form.Item>
        </Form>
    )
}
function NumberTemp() {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Success:', values);
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    return (
        <Form
            name="numberT"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            form={form}
            onFinish={onFinish}
        >
            <Form.Item
                label="功能点名称："
                name="username"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="标识符"
                name="password"
            ><span>switch</span>
            </Form.Item>
            <Form.Item
                label="数据类型："
                name="password"
            ><span>
                    数值型</span>
            </Form.Item>
            <Form.Item label="数值范围">
                <div className='number-input-wrap'>
                    <Form.Item
                        name={['address', 'province']}
                        noStyle
                        rules={[{ required: true, message: 'Province is required' }]}
                    >
                        <Input style={{ width: '40%' }} />
                    </Form.Item>
                    <span style={{ margin: '0 10px' }}>至</span>
                    <Form.Item
                        name={['address', 'street']}
                        noStyle
                        rules={[{ required: true, message: 'Street is required' }]}
                    >
                        <Input style={{ width: '40%' }} />
                    </Form.Item>
                </div>
            </Form.Item>
            <Form.Item
                label="数据间隔"
                name="username"
            >
                <Input />
            </Form.Item>
            <Form.Item name="gender" label="倍数" rules={[{ required: true }]}>
                <Select allowClear >
                    <Option value="male">100</Option>
                    <Option value="female">female</Option>
                </Select>
            </Form.Item>
            <Form.Item name="gender" label="单位" >
                <Select allowClear >
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="数据传输类型："
                name="password"
            ><span>可下发可上报</span>
            </Form.Item>
        </Form>
    )
}