import React, { useState, useRef, useImperativeHandle,forwardRef,useEffect } from 'react'
import { Tabs, Form, Input, Button, Cascader } from 'antd';
import { UploadFileHooks } from '../../../components/upload-file';
import { post, Paths, get } from '../../../api';
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
export default function DeviceShadow(props,ref) {
    const [form] = Form.useForm();
    useEffect(()=>{
        getType()
    },[])
    const getType = (loading = true) => {
        // Paths.getDeviceInfo
        post('http://10.6.50.121:33331/workOrder/getWorkOrderDictionary', { }, { loading }).then((res) => {
        });
    }
    const $el = useRef(null)
    function onChange(value) {
        console.log(value);
    }
    const subOrder=()=>{
        form.validateFields().then(value => {
            // 验证通过后进入
            // const { name, age } = value;
            console.log(value,'==='); // dee 18
        }).catch(err => {
            // 验证不通过时进入
            console.log(err);
        });
    }
    useImperativeHandle(ref, () => ({
        subOrder
    }));
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
                <Cascader options={options} onChange={onChange} style={{ width: '612px' }} popupClassName='order-Cascader'/>
            </Form.Item>
            <Form.Item
                label="问题描述"
                name="problemDesc"
                rules={[{ required: true }]}
            >
                <TextArea rows={4} style={{ width: '612px' }} />
            </Form.Item>
            <Form.Item
                label="上传问题图片/视频"
                name="image"
            >
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
DeviceShadow = forwardRef(DeviceShadow)