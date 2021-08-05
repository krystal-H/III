import React, { useState } from 'react'
import { Tabs, Form, Input, Button, Cascader } from 'antd';
const { TextArea } = Input;
const options = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];
export default function DeviceShadow() {
    const [form] = Form.useForm();
    function onChange(value) {
        console.log(value);
    }
    return (<div id='order-home-sub'>
        <Form
            name="basic"
            form={form}
        >
            <Form.Item
                label="选择内容分类"
                name="username"
                rules={[{ required: true }]}
            >
                <Cascader options={options} onChange={onChange} />
            </Form.Item>
            <Form.Item
                label="问题描述"
                name="usernam1e"
                rules={[{ required: true }]}
            >
                <TextArea rows={4} />
            </Form.Item>

        </Form>
    </div>)
}