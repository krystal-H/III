import React, { useState, useRef, useEffect } from 'react'
import { Tabs, Form, Input, Button, Cascader } from 'antd';
import { UploadFileHooks } from '../../../components/upload-file';
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
    const $el = useRef(null)
    function onChange(value) {
        console.log(value);
    }
    // useEffect(() => {
    //     let fathDom = document.getElementById('order-home-sub')
    //     let childDOm = fathDom.getElementsByClassName("ant-upload-text")[0]
    //     childDOm.text=''
    //     console.log(fathDom, childDOm)
    // }, [])
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
                <Cascader options={options} onChange={onChange} style={{ width: '612px' }} />
            </Form.Item>
            <Form.Item
                label="问题描述"
                name="usernam1e"
                rules={[{ required: true }]}
            >
                <TextArea rows={4} style={{ width: '612px' }} />
            </Form.Item>
            <Form.Item
                label="上传问题图片/视频"
                name="usernam1e"
            >
                {/* <UploadFileHooks
                    ref={$el}
                    maxCount={1}
                    preferSize={'750*1334'}
                    format='.gif,.jpeg,.jpg,.png'
                    maxSize={0.5} /> */}
                <UploadFileHooks
                    ref={$el}
                    maxCount={10}
                    format='.jpg、.png、.gif、.dvi'
                    maxSize={50}
                    isNotImg={true}
                />
            </Form.Item>
            <Form.Item
                label="联系方式"
                name="usernam1e"
            >
                <Input style={{ width: '612px' }} />
            </Form.Item>
        </Form>
    </div>)
}