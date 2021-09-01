import React, { useEffect, useState, useImperativeHandle, forwardRef, useRef } from 'react'
import moment from 'moment';
import { Form, Input, Button, Space, Select, Radio, Tabs, Drawer } from 'antd';
import { UploadFileHooks } from '../../../../components/upload-file';
import { post, Paths, get } from '../../../../api';
import './titleSet.scss'
export default function TitleEdit({ titleVisible, onCloseTitle, onOkClose }) {
    let productItem = {}
    if (sessionStorage.getItem('productItem')) {
        productItem = JSON.parse(sessionStorage.getItem('productItem'))
    }
    const [form] = Form.useForm();
    const oneRef = useRef();
    const [optionArr,setOptionArr]=useState([])
    //提交数据
    const subData = () => {
        form.validateFields().then(val => {
            let params = {
                productId: productItem.productId,
                productName: val.productName,
                brandId: val.brandId,
                productIcon: val.productIcon[0].url,
                productCode: val.productCode
            }
            post(Paths.editProductInfo, params).then((res) => {
                // delaData(res.data)
            });
        })
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
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    form={form}
                    initialValues={{
                        productIcon: [{ url: productItem.productIcon }],
                        productName: productItem.productName
                    }}
                >
                    <Form.Item
                        label="产品名称"
                        name="productName"
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
                    ><span>{productItem.productId}</span>
                    </Form.Item>
                    <Form.Item
                        label="品类"
                    ><span>{productItem.deviceType}</span>
                    </Form.Item>
                    <Form.Item
                        label="品牌"
                        name="brandId"
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
                        <Select  >
                            {
                                optionArr.map(item => {
                                    return (<Option value={item.key} key={item.key}>{item.value}</Option>)
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="通信协议"
                    ><span>{productItem.bindTypeStr}</span>
                    </Form.Item>
                    <Form.Item
                        label="智能化方案"
                    ><span>{productItem.schemeName}</span>
                    </Form.Item>
                    <Form.Item
                        label="产品编码"
                    ><span>{productItem.productCode}</span>
                    </Form.Item>
                    <Form.Item
                        label="产品密钥"
                    ><span>{productItem.deviceKey}</span>
                    </Form.Item>
                    <Form.Item
                        label="产品图片"
                        name='productIcon'
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

