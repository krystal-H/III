import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from 'react'
import { Form, Input, Button, Cascader } from 'antd';
import { UploadFileHooks } from '../../../components/upload-file';
import { post, Paths, get } from '../../../api';
import { Notification } from '../../../components/Notification'
const { TextArea } = Input;
export default function DeviceShadow({ onSuccess }, ref) {
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
            let image = ''
            value.image.forEach((item, index) => {
                if (index === value.image.length - 1) {
                    image += item.url
                } else {
                    image += item.url + ','
                }
            })
            let problemTypeOneName, problemTypeTwoName
            options.forEach(item => {
                if (item.value === value.problemType[0]) {
                    problemTypeOneName = item.label
                    item.children.forEach(item2 => {
                        if (item2.value === value.problemType[1]) {
                            problemTypeTwoName = item2.label
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
                Notification({
                    type: 'success',
                    description: '???????????????'
                })
                form.resetFields();
                // onSuccess()
            });
        })
    }
    useImperativeHandle(ref, () => ({
        subOrder
    }),[options.length]);
    return (<div id='order-home-sub'>
        <Form
            name="basic"
            form={form}
            initialValues={{ image: [] }}
        >
            <Form.Item
                label="??????????????????"
                name="problemType"
                rules={[{ required: true }]}
            >
                <Cascader options={options} onChange={onChange} style={{ width: '612px' }} popupClassName='order-Cascader' />
            </Form.Item>
            <Form.Item
                label="????????????"
                name="problemDesc"
                rules={[{ required: true, whitespace: true }]}
            >
                <TextArea rows={4} maxLength={1000} showCount style={{ width: '612px' }} />
            </Form.Item>
            <Form.Item
                label="??????????????????"
                name="image"
            >
                <UploadFileHooks
                    style={{ width: '612px' }}
                    ref={$el}
                    maxCount={10}
                    format='.jpg,.png,.gif'
                    preferSize='??????'
                />
            </Form.Item>
            <Form.Item
                label="????????????"
                name="phone"
                rules={[{ pattern: /^(((\d{3,4}-)?\d{7,8})|(1\d{10}))$/, whitespace: true, message: '??????????????????????????????' }]}
            >
                <Input style={{ width: '612px' }} />
            </Form.Item>
        </Form>
    </div>)
}
DeviceShadow = forwardRef(DeviceShadow)