import React, { useEffect, useState, useImperativeHandle, forwardRef, useRef } from 'react'
import { Form, Input, Button, Drawer, Tag, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
// import './editInfo.scss'
export default function ProtocolDelete({ rightVisible, onCloseRight, destData}) {
    useEffect(() => {
    }, [])

    const [form] = Form.useForm();
    const subData = () => {
        form.validateFields().then(value => {
            // 验证通过后进入
            console.log(value); // dee 18
        }).catch(err => {
            // 验证不通过时进入
            console.log(err);
        });
    }
    //销毁dom
    const afterVisibleChange=(visible)=>{
        if(!visible){
            destData()
        }
    }
    return (
        <Drawer
            title='编辑标准功能'
            placement="right"
            closable={false}
            onClose={onCloseRight}
            visible={rightVisible}
            afterVisibleChange={afterVisibleChange}
            destroyOnClose={true}
            width={393}
            footer={
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Button onClick={onCloseRight} style={{ marginRight: 8 }}>
                        取消
                    </Button>
                    <Button onClick={subData} type="primary">
                        确定
                    </Button>
                </div>
            }
        >
            <div className='edit-left-protocol-wrap'><EnumerTemp formS={form}></EnumerTemp></div>
        </Drawer>)
}
function BoolTemp({ formS }) {
    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            form={formS}
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
                name="pasasword"
            ><span>switch</span>
            </Form.Item>
            <Form.Item
                label="数据类型："
                name="passwordssss"
            ><span>switch</span>
            </Form.Item>
            <Form.Item
                label="数据传输类型："
                name="passwordsas"
            ><span>可下发可上报</span>
            </Form.Item>
        </Form>
    )
}
function EnumerTemp({ formS }) {
    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            form={formS}
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
            <Form.Item
                label="枚举型:"
                name="enumus_text"
                className='enums-lise-nobottom'
            ><><span style={{ marginRight: '50px' }}>参数值</span>-<span style={{ marginLeft: '30px' }}>参数描述</span></>
            </Form.Item>

            <div className='right-list-wrap' >
                <Form.List name="userss">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'first']}
                                        fieldKey={[fieldKey, 'first']}
                                        className='enums-lise-nobottom'
                                        noStyle
                                    >
                                        <Input />
                                    </Form.Item>
                                    <span>-</span>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'last']}
                                        fieldKey={[fieldKey, 'last']}
                                        className='enums-lise-nobottom'
                                        noStyle
                                    >
                                        <Input />
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
            <Form.Item
                label="数据传输类型："
                name="password"
            ><span>可下发可上报</span>
            </Form.Item>
        </Form>
    )
}
function NumberTemp({ formS }) {
    return (
        <Form
            name="numberT"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            form={formS}
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
            ><span>数值型</span>
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