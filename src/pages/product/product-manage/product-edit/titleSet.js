import React, { useEffect, useState, useImperativeHandle, forwardRef, useRef } from 'react'
import { Form, Input, Button, Space, Select, Radio, Tabs, Drawer } from 'antd';
import { UploadFileHooks } from '../../../../components/upload-file';
import { post, Paths, get } from '../../../../api';
import LabelVisible from '../../../../components/form-com/LabelVisible';
import { DateTool } from '../../../../util/util';
import './titleSet.scss'
export default function TitleEdit({ titleVisible, onCloseTitle, onOkClose }) {
    let productItem = {}
    if (sessionStorage.getItem('productItem')) {
        productItem = JSON.parse(sessionStorage.getItem('productItem'))
    }
    const [form] = Form.useForm();
    const oneRef = useRef();
    const [optionArr, setOptionArr] = useState([])
    useEffect(() => {

        post(Paths.getProductBrand).then((res) => {
            setOptionArr(res.data)
        });
    }, [])
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
                let obj = {
                    productName: val.productName,
                    brandId: val.brandId,
                    productIcon: val.productIcon[0].url,
                    productCode: val.productCode,
                    modifyTime: res.data.modifyTime
                }
                onOkClose(obj)
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
                        productName: productItem.productName,
                        brandId: productItem.brandId,
                        productCode: productItem.productCode,
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
                        <Input maxLength={30}/>
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
                        <span>{productItem.brandName}</span>

                    </Form.Item>
                    <Form.Item
                        label="产品型号"
                        name="productCode"
                    >
                        <Input />
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
                    ><span>{productItem.code}</span>
                    </Form.Item>
                    <Form.Item
                        label="产品密钥"
                    ><span>
                            <LabelVisible label={productItem.deviceKey} tip="" copy={false} />
                        </span>
                    </Form.Item>
                    <Form.Item
                        label="产品图片"
                        name='productIcon'
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <UploadFileHooks
                            ref={oneRef}
                            maxSize={10}
                            format='.gif,.jpeg,.jpg,.png'
                        />
                    </Form.Item>
                    <Form.Item
                        label="创建时间"
                    ><span>{DateTool.utcToDev(productItem.createTime)}</span>
                    </Form.Item>
                    <Form.Item
                        label="更新时间"
                    ><span>{productItem.modifyTime ?  DateTool.utcToDev(productItem.modifyTime) : '--'}</span>
                    </Form.Item>
                </Form>
            </div>
        </Drawer>)
}

