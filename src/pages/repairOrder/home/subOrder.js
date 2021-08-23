import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from 'react'
import {  Form, Input, Button, Cascader } from 'antd';
import { UploadFileHooks } from '../../../components/upload-file';
import { post, Paths, get } from '../../../api';
const { TextArea } = Input;
export default function DeviceShadow(props, ref) {
    const [form] = Form.useForm();
    useEffect(() => {
        getType()
    }, [])
    const [options, setOptions] = useState([])
    const getType = () => {
        post(Paths.getWorkOrderDictionary).then((res) => {
            let options = []
            for (let key in res.data.problemTypeOneLevel) {
                let item = {
                    value: key,
                    label: res.data.problemTypeOneLevel[key],
                    children: []
                }
                for (let key2 in res.data.problemTypeTwoLevel[key]) {
                    item.children.push({
                        value: key2,
                        label: res.data.problemTypeTwoLevel[key][key2],
                    })
                }
                options.push(item)
            }
            setOptions(options)
        });
    }
    const $el = useRef(null)
    function onChange(value) {
        console.log(value);
    }
    const subOrder = (loading = true) => {
        form.validateFields().then(value => {
            let image =''
            value.image.forEach((item,index)=>{
                if(index === value.image.length-1){
                    image+=item.url
                }else{
                    image+=item.url+','
                }
            })
            let problemTypeOneName, problemTypeTwoName
            options.forEach(item => {
                if(item.value === value.problemType[0]){
                    problemTypeOneName=item.label
                    item.children.forEach(item2=>{
                        if(item2.value===value.problemType[1]){
                            problemTypeTwoName=item2.label
                        }
                    })
                }
            })
            let data = {
                phone: value.phone,
                problemDesc: value.problemDesc,
                image: image,
                problemTypeOneLevel: value.problemType[0],
                problemTypeTwoLevel: value.problemType[1],
                problemTypeOneName,
                problemTypeTwoName
            }
            post(Paths.subWorkOrder, data, { loading }).then((res) => {
                form.resetFields();
                // setOptions(res.data)
            });
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
            initialValues={{ image: [] }}
        >
            <Form.Item
                label="选择内容分类"
                name="problemType"
                rules={[{ required: true }]}
            >
                <Cascader options={options} onChange={onChange} style={{ width: '612px' }} popupClassName='order-Cascader' />
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
                    style={{ width: '612px' }}
                    ref={$el}
                    maxCount={10}
                    format='.jpg,.png,.gif'
                    maxSize={5}
                />
            </Form.Item>
            <Form.Item
                label="联系方式"
                name="phone"
            >
                <Input style={{ width: '612px' }} />
            </Form.Item>
        </Form>
    </div>)
}
DeviceShadow = forwardRef(DeviceShadow)