import React, { useEffect, useState, useImperativeHandle, forwardRef, useRef } from 'react'
import moment from 'moment';
import { Form, Input, Button, Space, Select, Radio, Tabs, Drawer } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadFileHooks } from '../../../../components/upload-file';
import './titleSet.scss'
export default function TitleEdit({ titleVisible, onCloseTitle }) {
    useEffect(() => {
    }, [])
    const [form] = Form.useForm();
    const oneRef = useRef();
    //提交数据
    const subData = () => {
        const value = form.getFieldsValue(); // {name: 'dee', age: 18}
        console.log(value,'======')
        // form.resetFields();
    }
    return (
        <Drawer
            title='产品信息'
            placement="right"
            closable={false}
            onClose={onCloseTitle}
            visible={titleVisible}
            destroyOnClose={true}
            width={393}
            footer={
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Button onClick={onCloseTitle} style={{ marginRight: 8 }}>
                        取消
                    </Button>
                    <Button onClick={subData} type="primary">
                        确定
                    </Button>
                </div>
            }
        >
            <div className='edit-left-protocol-wrap'>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    form={form}
                >
                    <Form.Item
                        label="产品名称"
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
                        label="产品ID"
                    ><span>switch</span>
                    </Form.Item>
                    <Form.Item
                        label="品类"
                    ><span>枚举型</span>
                    </Form.Item>
                    <Form.Item
                        label="品牌"
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
                        label="产品型号"
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
                        label="通信协议"
                    ><span>枚举型</span>
                    </Form.Item>
                    <Form.Item
                        label="智能化方案"
                    ><span>枚举型</span>
                    </Form.Item>
                    <Form.Item
                        label="产品编码"
                    ><span>枚举型</span>
                    </Form.Item>
                    <Form.Item
                        label="产品密钥"
                    ><span>枚举型</span>
                    </Form.Item>
                    <Form.Item
                        label="产品图片"
                        name='prcImg'
                    >
                        <UploadFileHooks
                            ref={oneRef}
                            maxSize={10}
                            format='.gif,.jpeg,.jpg,.png'
                        />
                    </Form.Item>
                    <Form.Item
                        label="创建时间"
                    ><span>枚举型</span>
                    </Form.Item>
                    <Form.Item
                        label="更新时间"
                    ><span>枚举型</span>
                    </Form.Item>
                </Form>
            </div>
        </Drawer>)
}

